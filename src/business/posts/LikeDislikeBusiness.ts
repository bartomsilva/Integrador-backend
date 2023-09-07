import { LikesDislikesDatabase } from "../../database/posts/LikeDislikeDatabase"
import { LikeDislikeInputDTO } from "../../dtos/posts/likeDislike.dto"
import { BadRequestError } from "../../error/BadRequest"
import { NotFoundError } from "../../error/NotFound"
import { LikesDislikesDB, PostDB } from "../../models/posts/Post"
import { TokenManager } from "../../services/TokenManager"

export class LikeDislikeBusiness {

  constructor(
    private likesDislikesDataBase: LikesDislikesDatabase,
    private tokenManager: TokenManager) { }

  // tratativas da ação: like / dislike    
  public likeDislike = async (input: LikeDislikeInputDTO): Promise<void> => {

    // pega o id do post 
    const { id: postId, like, token } = input
    const likeVal: number = like ? 1 : 0

    // validação token 
    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == undefined) {
      throw new BadRequestError("token inválido")
    }

    // pega o id do usuário 
    const { id: userId } = payLoad

    // monta o objeto de likes dislikes
    const postLikeDislike: LikesDislikesDB = {
      user_id: userId,
      post_id: postId,
      like: likeVal
    }

    // procurar o post 
    const [post]: PostDB[] = await this.likesDislikesDataBase.findPost(postId)
    if (post === undefined) {
      throw new NotFoundError("post não encontrado")
    }

    // Verifica se o post é do mesmo usuário
    if (post.creator_id === userId) {
      throw new BadRequestError("ação inválida")
    }

    // pesquisa se ( likes_dislikes ) se existe registro: User x Post
    const likeDislikeDB: LikesDislikesDB = 
    await this.likesDislikesDataBase.findLikeDislike(postId, userId)

    // inserir na tabela (caso não haja registro)
    if (likeDislikeDB === undefined) {
      await this.likesDislikesDataBase.insertLikeDislike(postLikeDislike)
      if (likeVal === 1) {
        await this.likesDislikesDataBase.postIncreaseLike(postId)
      } else {
        await this.likesDislikesDataBase.postIncreaseDislike(postId)
      }
    } else { // existe um registro entre User x Post 
      // deletar o like/Dislike se for a mesma opção
      if (likeVal == likeDislikeDB.like) {
        await this.likesDislikesDataBase.deleteLikeDislike(postId, userId)
        if (likeVal === 1) {
          await this.likesDislikesDataBase.postDecreaseLike(postId)
        } else {
          await this.likesDislikesDataBase.postDecreaseDislike(postId)
        }
      } else { // trocar de like para dislike ou dislike para like (inverter)
        await this.likesDislikesDataBase.updateLikeDislike(postLikeDislike)
        if (likeVal==1){
          await this.likesDislikesDataBase.postReverseDislikeToLike(postId)
        }
        else {
          await this.likesDislikesDataBase.postReverseLikeToDislike(postId)
        }
      }
    }
  }
}
import { CommentDataBase } from "../database/CommentDatabase"
import { CreateCommentInputDTO } from "../dtos/comments/createComment.dto"
import { DeleteCommentInputDTO } from "../dtos/comments/deleteComment.dto"
import { GetCommentInputDTO, GetCommentOutputDTO } from "../dtos/comments/getComment.dto"
import { UpdateCommentInputDTO } from "../dtos/comments/updateComment.dto"
import { BadRequestError } from "../error/BadRequest"
import { NotFoundError } from "../error/NotFound"
import { UnAuthorizedError } from "../error/UnAuthorized"
import { CommentDB, CommentResultDB, CommentUpdateDB } from "../models/Comments"
import { LIKED } from "../models/Post"
import { USER_ROLES } from "../models/User"
import { IdGenerator } from "../services/IdGenarator"
import { TokenManager } from "../services/TokenManager"

export class CommentBusiness {
  constructor(
    private commentDataBase: CommentDataBase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager) { }

  //=============== CREATE COMMMENT 
  public createComment = async (input: CreateCommentInputDTO): Promise<string> => {

    const { postId, content, token } = input

    // validando o token
    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == null) {
      throw new BadRequestError("token inválido")
    }

    // paga o id do usuário no objeto que é o resultado 
    // da validação do token
    const { id: creatorId } = payLoad

    // pega os dados do post
    const [postDB] = await this.commentDataBase.findPost(postId)

    // verifica se o post existe
    if (postDB == undefined) {
      throw new NotFoundError("post não encontrado")
    }

    // gera um novo id para o comentário
    const id = this.idGenerator.generate()

    // aqui cria o objeto com os dados do novo comentário
    const newComment: CommentDB = {
      creator_id: creatorId,
      post_id: postId,
      parental_post_id: "",
      content,
      likes: 0,
      dislikes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    // enviando para ser salvo no banco de dados
    await this.commentDataBase.insertComment(newComment)
    // incrementando o número de comentários no post
    await this.commentDataBase.incrementComments(postId)
    return "ok"
  }

  //============= EDIT COMMENT
  public editComment = async (id: string, input: UpdateCommentInputDTO): Promise<string> => {

    const { content, token } = input

    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == null) {
      throw new BadRequestError("token inválido")
    }
    // pagar o id do usuário
    const { id: creatorId } = payLoad

    const updateComment: CommentUpdateDB = {
      id,
      content,
      updated_at: new Date().toISOString()
    }

    // pesquisa o comment 
    const [resultComment] = await this.commentDataBase.findComment(id)

    if (!resultComment) {
      throw new NotFoundError("'id' não encontrado")
    }

    //checar se o usuário pode editar o comentario 
    if (resultComment.creator_id.toString() != creatorId) {
      throw new UnAuthorizedError("recurso negado")
    }
    await this.commentDataBase.updateComment(updateComment, creatorId)
    return "ok"
  }


  //============= DELETE COMENTARIO
  public deleteComment = async (input: DeleteCommentInputDTO): Promise<string> => {
    const { id, token } = input

    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == null) {
      throw new BadRequestError("token inválido")
    }
    // pagar o id do usuário
    const { id: creatorId, role } = payLoad

    // pesquisa o comentario 
    const [resultComment]: CommentDB[] = await this.commentDataBase.findComment(id)

    if (!resultComment) {
      throw new NotFoundError("'id' não encontrado")
    }
    const [resultPost] = await this.commentDataBase.findPost(resultComment.post_id)

    //checar se o usuário pode deletar o comentario 
    if (resultComment.creator_id.toString() != creatorId
      && role != USER_ROLES.ADMIN
      && resultPost.creator_id != creatorId) {
      throw new UnAuthorizedError("recurso negado")
    }
    await this.commentDataBase.deleteComment(id)
    await this.commentDataBase.decrementComments(resultComment.post_id)
    return "ok"

  }

  //============ GET COMMENTS
  public getComment = async (input: GetCommentInputDTO): Promise<GetCommentOutputDTO[]> => {

    const { postId, token } = input
    let resultDB:any[]

    // validar o token
    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == null) {
      throw new BadRequestError("token inválido")
    }

    resultDB = await this.commentDataBase.getComment(postId)
    
    const response = await Promise.all(resultDB.map(async (comment) => {
          
      const resultLikedDB = await this.commentDataBase.
        findLikeDislike(comment.id, payLoad.id)

      // valor default
      let liked: LIKED = LIKED.NOLIKED

      if (resultLikedDB != undefined) {
        liked = resultLikedDB.like == 1 ? LIKED.LIKE : LIKED.DISLIKE
      }

      const commentNew = {
        id: comment.id,
        postId: comment.post_id,
        parentalPostId: comment.parental_post_id,
        content: comment.content,
        likes: comment.likes,
        dislikes: comment.dislikes,
        comments: comment.comments,
        creator: {
          id: comment.creator_id._id,
          name: comment.creator_id.name
        },
        liked
      }
      return commentNew
    }))
    return response
  }
}
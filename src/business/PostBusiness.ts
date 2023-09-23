import { PostDataBase } from "../database/PostDataBase"
import { CreatePostInputDTO } from "../dtos/posts/createPost.dto"
import { DeletePostInputDTO } from "../dtos/posts/deletePost.dto"
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/posts/getPost.dto"
import { UpdatePostInputDTO } from "../dtos/posts/updatePost.dto"
import { BadRequestError } from "../error/BadRequest"
import { NotFoundError } from "../error/NotFound"
import { UnAuthorizedError } from "../error/UnAuthorized"
import { LIKED, POST_ACTION, PostDB, PostUpdateDB } from "../models/Post"
import { USER_ROLES } from "../models/User"
import { IdGenerator } from "../services/IdGenarator"
import { TokenManager } from "../services/TokenManager"

export class PostBusiness {
  constructor(
    private postDataBase: PostDataBase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager) { }

  //=============== CREATE POST 
  public createPost = async (input: CreatePostInputDTO): Promise<PostDB> => {

    const { content, token } = input

    // validando o token
    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == null) {
      throw new BadRequestError("token inválido")
    }

    // paga o id do usuário no objeto que é o resultado 
    // da validação do token
    const { id: creatorId } = payLoad

    // gera um novo id para o post
    const id = this.idGenerator.generate()

    // aqui cria o objeto com os dados do novo post
    const newPost: PostDB = {
      id,
      creator_id: creatorId,
      content,
      likes: 0,
      dislikes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    // enviando para ser salvo no banco de dados
    await this.postDataBase.insertPost(newPost)
    return newPost
  }

  //============= EDIT POST
  public editPost = async (id: string, input: UpdatePostInputDTO): Promise<string> => {

    const { content, token } = input

    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == null) {
      throw new BadRequestError("token inválido")
    }
    // pagar o id do usuário
    const { id: creatorId } = payLoad

    const updatePost: PostUpdateDB = {
      id,
      content,
      updated_at: new Date().toISOString()
    }

    // pesquisa o post 
    const [resultPost] = await this.postDataBase.findPost(id)

    if (!resultPost) {
      throw new NotFoundError("'id' não encontrado")
    }

    //checar se o usuário pode editar o post 
    if (resultPost.creator_id != creatorId) {
      throw new UnAuthorizedError("recurso negado")
    }

    await this.postDataBase.updatePost(updatePost, creatorId)

    return "ok"
  }


  //============= DELETE POST
  public deletePost = async (input: DeletePostInputDTO): Promise<string> => {
    const { id, token } = input

    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == null) {
      throw new BadRequestError("token inválido")
    }
    // pagar o id do usuário
    const { id: creatorId, role } = payLoad

    // pesquisa o post 
    const [resultPost]: PostDB[] = await this.postDataBase.findPost(id)

    if (!resultPost) {
      throw new NotFoundError("'id' não encontrado")
    }

    //checar se o usuário pode deletar o post 
    if (resultPost.creator_id != creatorId && role != USER_ROLES.ADMIN) {
      throw new UnAuthorizedError("recurso negado")
    }

    await this.postDataBase.deletePost(id)
    
    return "ok"
  }

  //============ GET POSTS
  public getPost = async (input: GetPostInputDTO): Promise<GetPostOutputDTO[]> => {

    const { token } = input
    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == null) {
      throw new BadRequestError("token inválido")
    }

    const resultDB = await this.postDataBase.getPost()

    const response = await Promise.all(resultDB.map(async (post) => {
      
      const resultLikedDB = await this.postDataBase.
      findLikeDislike(post.id, payLoad.id)
      
      // valor default - DEVOLVE NO / LIKE / DISLIKE
      let liked: LIKED = LIKED.NOLIKED
      if (resultLikedDB != undefined) {
        liked = resultLikedDB.like == 1 ? LIKED.LIKE : LIKED.DISLIKE
      }

      const postNew = {
        id: post.id,
        content: post.content,
        likes: post.likes,
        dislikes: post.dislikes,
        comments: post.comments,
        updatedAt: post.updated_at,
        creator: {
          id: post.creator_id,
          name: post.creator_name
        },
        liked
      }
      return postNew
    }))
    return response
  }
}

import { CommentDataBase } from "../database/CommentDatabase"
import { CreateCommentInputDTO } from "../dtos/comments/createComment.dto"
import { DeleteCommentInputDTO } from "../dtos/comments/deleteComment.dto"
import { GetCommentInputDTO, GetCommentOutputDTO } from "../dtos/comments/getComment.dto"
import { UpdateCommentInputDTO } from "../dtos/comments/updateComment.dto"
import { BadRequestError } from "../error/BadRequest"
import { NotFoundError } from "../error/NotFound"
import { UnAuthorizedError } from "../error/UnAuthorized"
import { CommentDB, CommentResultDB, CommentUpdateDB } from "../models/Comments"
import { USER_ROLES } from "../models/User"
import { IdGenerator } from "../services/IdGenarator"
import { TokenManager } from "../services/TokenManager"

export class CommentBusiness {
  constructor(
    private commentDataBase: CommentDataBase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager) { }

  //=============== CREATE COMMMENT 
  public createComment = async (input: CreateCommentInputDTO): Promise<void> => {

    const { postId, content, token } = input

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
    const newComment: CommentDB = {
      id,
      post_id: postId,
      creator_id: creatorId,
      parental_post_id:"",
      content,
      likes: 0,
      dislikes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    // enviando para ser salvo no banco de dados
    //await this.postDataBase.insertPost(newPost)
  }

  //============= EDIT COMMENT
  public editComment = async (id: string, input: UpdateCommentInputDTO): Promise<void> => {

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

    if ( !resultComment) {
      throw new NotFoundError("'id' não encontrado")
    }
    
    //checar se o usuário pode editar o comentario 
    if (resultComment.creator_id != creatorId) {
      throw new UnAuthorizedError("Recurso negado")
    }
    await this.commentDataBase.updateComment(updateComment, creatorId)
  }


  //============= DELETE COMENTARIO
  public deleteComment = async (input:DeleteCommentInputDTO): Promise<void> => {
    const { id, token } = input

    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == null) {
      throw new BadRequestError("token inválido")
    }
    // pagar o id do usuário
    const { id: creatorId, role } = payLoad

     // pesquisa o comentario 
    const [resultComment]:CommentDB[] = await this.commentDataBase.findComment(id)

    if ( !resultComment) {
      throw new NotFoundError("'id' não encontrado")
    }
     //checar se o usuário pode deletar o comentario 
    if (resultComment.creator_id != creatorId && role != USER_ROLES.ADMIN) {
      throw new UnAuthorizedError("Recurso negado")
    }
    await this.commentDataBase.deleteComment(id)
  }

  //============ GET COMMENTS
  public getComment = async (input:GetCommentInputDTO):Promise<GetCommentOutputDTO[]> => {

    const { postId, token } = input 
    
    // validar o token
    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == null) {
      throw new BadRequestError("token inválido")
    }

    const resultDB:CommentResultDB[] = await this.commentDataBase.getComment(postId)
    
    const output:GetCommentOutputDTO[] = resultDB.map( comment => {
      const commentNew={
        id: comment.id,
        postId: comment.post_id,
        parentalPostId: comment.parental_post_id,
        content: comment.content,
        likes: comment.likes,
        dislikes: comment.dislikes,
        comments: comment.comments,
        creator: {
          id: comment.creator_id,
          name: comment.creator_name
        }      
      }      
      return commentNew
    }) 
     return output
  }  
}
import { Request, Response } from "express"
import { CreateCommentSchema } from "../dtos/comments/createComment.dto"
import { handlerError } from "../error/handlerError"
import { HTTP_CODE } from "../util/util"
import { UpdateCommentSchema } from "../dtos/comments/updateComment.dto"
import { DeleteCommentSchema } from "../dtos/comments/deleteComment.dto"
import { GetCommentShema } from "../dtos/comments/getComment.dto"
import { CommentBusiness } from "../business/CommentBusiness"

export class CommentController {
  constructor(private commentBusiness: CommentBusiness)
     { }

  //============ GET COMMENT
  public getComment = async (req: Request, res: Response) => {
    try {
      
      const input = GetCommentShema.parse({
        postId: req.params.id,
        token: req.headers.authorization
      })

      const output = await this.commentBusiness.getComment(input)

      res.status(HTTP_CODE.OK).send(output)

    } catch (error) {
      handlerError(res, error)
    }
  }
  //=============== CREATE COMMENT
  public createComment = async (req: Request, res: Response) => {
    try {
      const input = CreateCommentSchema.parse({
        postId: req.params.id,
        content: req.body.content,
        token: req.headers.authorization
      })

      const response = await this.commentBusiness.createComment(input)

      res.status(HTTP_CODE.CREATED).send(response)

    } catch (error) {
      handlerError(res, error)
    }
  }

  //============= EDIT COMMENT
  public editComment = async (req: Request, res: Response) => {
    try {

      const id: string = req.params.id

      const input = UpdateCommentSchema.parse({
        content: req.body.content,
        token: req.headers.authorization
      })

      const response = await this.commentBusiness.editComment(id, input)

      res.status(HTTP_CODE.OK).send(response)

    } catch (error) {
      handlerError(res, error)
    }
  }

  // DELETE COMMENT
  public deleteComment = async (req: Request, res: Response) => {
    try {
      const input = DeleteCommentSchema.parse(
        {
          id: req.params.id,
          token: req.headers.authorization as string
        })

      await this.commentBusiness.deleteComment(input)

      res.sendStatus(HTTP_CODE.OK)

    } catch (error) {
      handlerError(res, error)
    }
  }
}
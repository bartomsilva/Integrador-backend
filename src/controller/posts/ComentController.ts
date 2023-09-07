import { Request, Response } from "express"
import { CreateCommentSchema } from "../../dtos/comments/createComment.dto"
import { handlerError } from "../../error/handlerError"
import { HTTP_CODE } from "../../util/util"
import { UpdateCommentSchema } from "../../dtos/comments/updateComment.dto"
import { DeleteCommentSchema } from "../../dtos/comments/deleteComment.dto"

export class CommentController {
  constructor() { }

  //=============== CREATE COMMENT
  public createComment = async (req: Request, res: Response) => {
    try {
      const input = CreateCommentSchema.parse({
        content: req.body.content,
        token: req.headers.authorization
      })

      //await this.postBusiness.createPost(input)

      res.sendStatus(HTTP_CODE.CREATED)

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

      //await this.postBusiness.editPost(id, input)

      res.sendStatus(HTTP_CODE.OK)

    } catch (error) {
      handlerError(res, error)
    }
  }

  // DELETE COMMENT
  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeleteCommentSchema.parse(
        {
          id: req.params.id,
          token: req.headers.authorization as string
        })

      //await this.postBusiness.deletePost(input)

      res.sendStatus(HTTP_CODE.OK)

    } catch (error) {
      handlerError(res, error)
    }
  }
}
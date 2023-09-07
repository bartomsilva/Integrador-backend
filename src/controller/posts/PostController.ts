import { Request, Response } from "express"
import { PostBusiness } from "../../business/posts/PostBusiness"
import { LikeDislikeBusiness } from "../../business/posts/LikeDislikeBusiness"
import { CreatePostSchema } from "../../dtos/posts/createPost.dto"
import { handlerError } from "../../error/handlerError"
import { UpdatePostSchema } from "../../dtos/posts/updatePost.dto"
import { DeletePostSchema } from "../../dtos/posts/deletePost.dto"
import { GetPostShema } from "../../dtos/posts/getPost.dto"
import { LikeDislikeSchema } from "../../dtos/posts/likeDislike.dto"
import { HTTP_CODE } from "../../util/util"

export class PostController {
  constructor(private postBusiness: PostBusiness,
    private likeDislikeBusiness: LikeDislikeBusiness) { }

  //=============== CREATE POST
  public createPost = async (req: Request, res: Response) => {

    try {
      const input = CreatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization
      })

      await this.postBusiness.createPost(input)

      res.sendStatus(HTTP_CODE.CREATED)

    } catch (error) {
      handlerError(res, error)
    }
  }

  //============= EDIT POST
  public editPost = async (req: Request, res: Response) => {
    try {

      const id: string = req.params.id

      const input = UpdatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization
      })

      await this.postBusiness.editPost(id, input)

      res.sendStatus(HTTP_CODE.OK)

    } catch (error) {
      handlerError(res, error)
    }
  }

  // DELETE POST
  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse(
        {
          id: req.params.id,
          token: req.headers.authorization as string
        })

      await this.postBusiness.deletePost(input)

      res.sendStatus(HTTP_CODE.OK)

    } catch (error) {
      handlerError(res, error)
    }
  }

  //============ GET POST
  public getPost = async (req: Request, res: Response) => {
    try {

      const input = GetPostShema.parse({
        token: req.headers.authorization
      })

      const output = await this.postBusiness.getPost(input)
      res.status(HTTP_CODE.OK).send(output)

    } catch (error) {
      handlerError(res, error)
    }
  }

  //================  LIKE DISLIKE
  public likeDislike = async (req: Request, res: Response) => {

    try {
      const input = LikeDislikeSchema.parse({
        id: req.params.id,
        like: req.body.like,
        action: req.body.action,
        token: req.headers.authorization as string
      })

      await this.likeDislikeBusiness.likeDislike(input)

      res.sendStatus(HTTP_CODE.OK)

    } catch (error) {
      handlerError(res, error)
    }
  }
}

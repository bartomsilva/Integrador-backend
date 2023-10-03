import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { CreatePostSchema } from "../dtos/posts/createPost.dto"
import { handlerError } from "../error/handlerError"
import { UpdatePostSchema } from "../dtos/posts/updatePost.dto"
import { DeletePostSchema } from "../dtos/posts/deletePost.dto"
import { GetPostShema } from "../dtos/posts/getPost.dto"
import { HTTP_CODE } from "../util/util"

export class PostController {
  constructor(private postBusiness: PostBusiness
    ) { }

  //=============== CREATE POST
  public createPost = async (req: Request, res: Response) => {

    try {
      const input = CreatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization
      })

      const response = await this.postBusiness.createPost(input)

      res.status(HTTP_CODE.CREATED).send(response)
      
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

      const response = await this.postBusiness.editPost(id, input)

      res.status(HTTP_CODE.OK).send(response)

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

      const response = await this.postBusiness.deletePost(input)
      res.status(HTTP_CODE.OK).send(response)

    } catch (error) {
      handlerError(res, error)
    }
  }

  //============ GET POST
  public getPost = async (req: Request, res: Response) => {
    try {

      const input = GetPostShema.parse({
        postId: req.params.id,
        token: req.headers.authorization
      })

      const output = await this.postBusiness.getPost(input)
      res.status(HTTP_CODE.OK).send(output)

    } catch (error) {
      handlerError(res, error)
    }
  }

}


export class CommentController {
  constructor() { }

  //=============== CREATE COMMENT
  public createComment = async (req: Request, res: Response) => {

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
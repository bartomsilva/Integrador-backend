import { Request, Response } from "express"
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness"
import { handlerError } from "../error/handlerError"
import { LikeDislikeSchema } from "../dtos/likeDislike/likeDislike.dto"
import { HTTP_CODE } from "../util/util"

export class LikeDislikeController {
  constructor(private likeDislikeBusiness: LikeDislikeBusiness) { }

  //================  LIKE DISLIKE
  public likeDislike = async (req: Request, res: Response) => {
   
    try {
      const input = LikeDislikeSchema.parse({
        id: req.params.id,
        like: req.body.like,
        action: req.body.action,
        token: req.headers.authorization as string
      })

      const response = await this.likeDislikeBusiness.likeDislike(input)
      res.status(HTTP_CODE.OK).send(response)

    } catch (error) {
      handlerError(res, error)
    }
  }
}

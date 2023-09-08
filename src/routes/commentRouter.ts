import express from "express"
import { CommentController } from "../controller/ComentController"
import { CommentBusiness } from "../business/CommentBusiness"
import { CommentDataBase } from "../database/CommentDatabase"
import { IdGenerator } from "../services/IdGenarator"
import { TokenManager } from "../services/TokenManager"
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness"
import { LikesDislikesDatabase } from "../database/LikeDislikeDatabase"

export const commentRouter = express.Router()

const commentController = new CommentController
  (
    new CommentBusiness(
      new CommentDataBase(),
      new IdGenerator(),
      new TokenManager()),
    new LikeDislikeBusiness(
      new LikesDislikesDatabase(),
      new TokenManager())
  )


//================== COMMENTS
commentRouter.post("/", commentController.createComment) 
commentRouter.get("/:id", commentController.getComment)
commentRouter.put("/:id", commentController.editComment)
commentRouter.delete("/:id", commentController.deleteComment)
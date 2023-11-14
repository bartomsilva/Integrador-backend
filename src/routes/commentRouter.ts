import express from "express"
import { CommentController } from "../controller/ComentController"
import { CommentBusiness } from "../business/CommentBusiness"
import { CommentDataBase } from "../database/CommentDatabase"
import { TokenManager } from "../services/TokenManager"

export const commentRouter = express.Router()

const commentController = new CommentController
  (
    new CommentBusiness(
      new CommentDataBase(),
      new TokenManager())    
  )


//================== COMMENTS
commentRouter.post("/:id", commentController.createComment) 
commentRouter.get("/:id", commentController.getComment)
commentRouter.put("/:id", commentController.editComment)
commentRouter.delete("/:id", commentController.deleteComment)
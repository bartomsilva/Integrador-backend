import express from "express"
import { TokenManager } from "../services/TokenManager"
import { LikeDislikeController } from "../controller/LikeDislikeController"
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness"
import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase"

export const likeDislikeRouter = express.Router()

const likeDislikeController = new LikeDislikeController
  ( new LikeDislikeBusiness(new LikeDislikeDatabase(), new TokenManager())   
  )

//================== LIKE, DISLIKE 
likeDislikeRouter.put("/:id", likeDislikeController.likeDislike)

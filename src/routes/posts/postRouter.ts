import express from "express"
import { IdGenerator } from "../../services/IdGenarator"
import { TokenManager } from "../../services/TokenManager"
import { PostController } from "../../controller/posts/PostController"
import { PostBusiness } from "../../business/posts/PostBusiness"
import { PostDataBase } from "../../database/posts/PostDataBase"
import { LikeDislikeBusiness } from "../../business/posts/LikeDislikeBusiness"
import { LikesDislikesDatabase } from "../../database/posts/LikeDislikeDatabase"

export const postRouter = express.Router()

const postController = new PostController
  (
    new PostBusiness(
      new PostDataBase(),
      new IdGenerator(),
      new TokenManager()),
      new LikeDislikeBusiness(
        new LikesDislikesDatabase(),
        new TokenManager())
  )

//=================== CREATE POST
postRouter.post("/",postController.createPost)
//================== GET POSTS
postRouter.get("/",postController.getPost)
//================== EDIT POST
postRouter.put("/:id",postController.editPost)
//================== DELETE POST
postRouter.delete("/:id",postController.deletePost)
//================== LIKE, DISLIKE 
postRouter.put("/:id/like", postController.likeDislike)

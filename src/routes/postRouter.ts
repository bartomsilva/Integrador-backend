import express from "express"
import { IdGenerator } from "../services/IdGenarator"
import { TokenManager } from "../services/TokenManager"
import { PostController } from "../controller/PostController"
import { PostBusiness } from "../business/PostBusiness"
import { PostDataBase } from "../database/PostDataBase"

export const postRouter = express.Router()

const postController = new PostController
  (
    new PostBusiness(
      new PostDataBase(),
      new IdGenerator(),
      new TokenManager())      
  )

//=================== CREATE POST
postRouter.post("/",postController.createPost)

//================== GET POSTS
postRouter.get("/",postController.getPost)

//================== GET POSTS
postRouter.get("/:id",postController.getPost)


//================== EDIT POST
postRouter.put("/:id",postController.editPost)

//================== DELETE POST
postRouter.delete("/:id",postController.deletePost)





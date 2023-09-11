import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import { userRouter } from "./routes/userRouter"
import { postRouter } from "./routes/postRouter"
import { commentRouter } from "./routes/commentRouter"
import { likeDislikeRouter } from "./routes/likeDislikesRouter"

dotenv.config()

const server = express()
server.use(express.json())
server.use(cors())

const PORT = Number(process.env.PORT) || 3000 
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

//================ ROTAS
  // users
server.use("/users", userRouter)
  // posts
server.use("/posts", postRouter)
  // comments
server.use("/comments", commentRouter)
  // likes dislikes
server.use("/likes", likeDislikeRouter)







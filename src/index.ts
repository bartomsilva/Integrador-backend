import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import { userRouter } from "./routes/userRouter"
import { postRouter } from "./routes/postRouter"
import { commentRouter } from "./routes/commentRouter"

dotenv.config()

const server = express()
server.use(express.json())
server.use(cors())

const PORT = Number(process.env.PORT) || 3000 
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

//================ ROTAS
server.use("/users", userRouter)
server.use("/posts", postRouter)
server.use("/comments", commentRouter)







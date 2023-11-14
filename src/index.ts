import express from "express"

const mongoose = require('mongoose')

import cors from "cors"
import dotenv from 'dotenv'
import { userRouter } from "./routes/userRouter"
import { postRouter } from "./routes/postRouter"
import { commentRouter } from "./routes/commentRouter"
import { likeDislikeRouter } from "./routes/likeDislikeRouter"

dotenv.config()

const server = express()
server.use(express.json())
server.use(cors())

const PORT = Number(process.env.PORT) || 3003 
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

// ///////////
// // MONGO DB

// const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority`

// // Conectando ao MongoDB usando Mongoose
// mongoose.connect(uri)
// // Verificando a conexão com o MongoDB
// const db = mongoose.connection;
// db.once('open', () => {
//   console.log("Conectado ao MongoDB!");
// });


//================ ROTAS
  // users
server.use("/users", userRouter)
  // posts
server.use("/posts", postRouter)
  // comments
server.use("/comments", commentRouter)
  // likes dislikes
server.use("/likes", likeDislikeRouter)







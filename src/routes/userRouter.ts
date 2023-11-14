import express from "express"
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { UserDataBase } from "../database/UserDataBase"
import { HashManager } from "../services/HashManager"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()

const userController = new UserController
  (
    new UserBusiness(
      new UserDataBase(),
      new HashManager(),
      new TokenManager()
    ),
  )

//================== GET USER
userRouter.get("/", userController.getUsers)

//================== SIGN UP / CREATE USER
userRouter.post("/signup", userController.createUser)

//=================== LOGIN
userRouter.post("/login", userController.login)

//================== CREATE ADMIN
userRouter.post("/createadmin", userController.createAdmin)

//================== CHECK LOGIN
userRouter.post("/checklogin", userController.checkLogin)

//================== RESET SENHA
userRouter.get("/resetpassword/:email", userController.resetPassword)

//================== SEND EMAIL
userRouter.post("/sendemail", userController.sendEmail)
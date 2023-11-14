import { UserDataBase } from "../database/UserDataBase"
import { CheckUserInputDTO, CheckUserOutputDTO } from "../dtos/users/checkUser.dto"
import { CreateAdminInputDTO } from "../dtos/users/createAdmin.dto"
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/users/getUsers.dto"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/users/login.dto"
import { CreateUserInputDTO, CreateUserOutputDTO } from "../dtos/users/signUp.dto"
import { BadRequestError } from "../error/BadRequest"
import { ConflictError } from "../error/ConflictError"
import { NotFoundError } from "../error/NotFound"
import { AdminDB, TokenPayload, USER_ROLES, UserDB } from "../models/User"
import { HashManager } from "../services/HashManager"
import { TokenManager } from "../services/TokenManager"
import { ResetPasswordInputDTO } from "../dtos/users/resetPassword.dto"
import nodemailer from "nodemailer"
import dotenv from 'dotenv'

dotenv.config()

export class UserBusiness {
  constructor(
    private userDataBase: UserDataBase,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) { }

 
  //=========== SIGN UP / CREATE USER
  public createUser = async (input: CreateUserInputDTO): Promise<CreateUserOutputDTO> => {

    const { name, email, password, news_letter } = input
    const hashedPassword = await this.hashManager.hash(password)
    const newUserDB: UserDB = {
      name,
      email,
      password: hashedPassword,
      role: USER_ROLES.NORMAL,
      created_at: new Date().toISOString(),
      news_letter: news_letter || ' ',
      reset_password: ' '
    }
    // verifica se o email já está em uso
    const userExist = await this.userDataBase.findUser(email)

    if (userExist != undefined) {
      throw new ConflictError("'email' já cadastrado")
    }
    // inseri o usuário no banco de dados
    const response = await this.userDataBase.insertUser(newUserDB)

    // modelagem do objeto (payload)
    const tokenPayload: TokenPayload = {
      id: response._id as string,
      name: newUserDB.name,
      role: newUserDB.role
    }

    // criação do token string a partir do payload
    const token = this.tokenManager.createToken(tokenPayload)

    // retorno 
    const output: CreateUserOutputDTO =
    {
      user: {
        userId: response._id as string,
        userName: newUserDB.name
      },
      token: token
    }

    return (output)

  }

  //========== LOGIN
  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {

    const { email, password } = input

    const userDB = await this.userDataBase.findUser(email)
    if (!userDB) {
      throw new NotFoundError("'email' não encontrado")
    }
    const passworValid = await this.hashManager.compare(password, userDB.password)
    if (!passworValid && userDB.reset_password != "*") {
      throw new BadRequestError("'password' incorreta")
    }

    // atualiza a senha do usuário
    if (userDB.reset_password == "*") {
      const hashedPassword = await this.hashManager.hash(password)
      // this.userDataBase.updatePassword(userDB.id, hashedPassword)
    }

    // modelagem do objeto (payload)
    const tokenPayload: TokenPayload = {
      id: userDB._id as string,
      name: userDB.name,
      role: userDB.role
    }

    // criação do token string a partir do payload
    const token = this.tokenManager.createToken(tokenPayload)

    const output: LoginOutputDTO =
    {
      user: {
        userId: userDB._id as string,
        userName: userDB.name
      },
      token: token
    }

    return output

  }

   //=========== GET USER
   public getUsers = async (input: GetUsersInputDTO): Promise<GetUsersOutputDTO[]> => {

    const { q, token } = input

    // geramos o payload a partir do token
    const payload = this.tokenManager.getPayload(token)

    // validamos a assinatura do token (vem null se inválido)
    if (payload === null) {
      throw new BadRequestError("token inválido")
    }

    const resultDB: UserDB[] = await this.userDataBase.getUser(q)

    // const output: GetUsersOutputDTO[] = resultDB.map((user) => {
    const output: any = resultDB.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at
      }
    })
    return output
  }

  //========== CREATE ADMIN
  public createAdmin = async (input: CreateAdminInputDTO): Promise<string> => {

    const { isAdmin, token } = input

    // validação token 
    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == undefined) {
      throw new BadRequestError("token inválido")
    }

    // id do usuário
    const id = payLoad.id

    const userDB = await this.userDataBase.findById(id)

    // ajusta do status do usuário
    const userNewStatus: AdminDB = {
      role: isAdmin ? USER_ROLES.ADMIN : USER_ROLES.NORMAL
    }
    await this.userDataBase.createAdmin(id, userNewStatus)
    return "ok"
  }

  //==========   CHECK LOGIN
  public checkLogin = async (input: CheckUserInputDTO): Promise<CheckUserOutputDTO> => {

    const { token } = input
    // validação token 
    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == undefined) {
      throw new BadRequestError("token inválido")
    }
    const output: CheckUserOutputDTO = {
      userId: payLoad.id,
      userName: payLoad.name
    }
    return output
  }

  //==========   RESET PASSWORD
  public resetPassword = async (input: ResetPasswordInputDTO): Promise<string> => {
    const { email } = input
    // validação do id 
    const resultDB = await this.userDataBase.findUser(email)
    if (resultDB == undefined) {
      throw new BadRequestError("'email' inválido")
    }
    await this.userDataBase.resetPassword(email)
    return 'ok'
  }

  // ENVIAR EMAIL
  public sendEmail = async (email: string): Promise<string> => {

    const resultDB = await this.userDataBase.findUser(email)

    if (!resultDB) {
      throw new NotFoundError("Email não cadastrado")
    }

    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true 465, false demais
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    let message = {
      from: 'Labeddit <process.env.MAIL_USER>',
      to: email,
      subject: "reset password",
      html: `
    <h3>Olá, segue o link para liberar o cadastro de sua nova senha.<h3>
    <a href="http://${process.env.SERVER_PATH}:3003/users/resetpassword/${email}" _self>Clique aqui</a>
    `
    };

    transport.sendMail(message)
    return "ok"

  }

}
import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { GetUsersSchema } from "../dtos/users/getUsers.dto"
import { handlerError } from "../error/handlerError"
import { CreateUserSchema } from "../dtos/users/signUp.dto"
import { LoginSchema } from "../dtos/users/login.dto"
import { CreateAdminSchema } from "../dtos/users/createAdmin.dto"
import { HTTP_CODE } from "../util/util"
import { CheckUserSchema } from "../dtos/users/checkUser.dto"

export class UserController {
  constructor(private userBusiness: UserBusiness) { }

  //========== GET USERS
  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {

      const input = GetUsersSchema.parse({
        q: req.query.q,
        token: req.headers.authorization
      })

      const output = await this.userBusiness.getUsers(input)

      res.status(HTTP_CODE.OK).send(output)

    } catch (error) {
      handlerError(res, error)
    }
  }

  //=========== SIGN UP / CREATE USER
  public createUser = async (req: Request, res: Response): Promise<void> => {

    try {
      const input = CreateUserSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        news_letter: req.body.newsLetter
      })

      const output = await this.userBusiness.createUser(input);

      res.status(HTTP_CODE.CREATED).send(output)

    } catch (error) {
      handlerError(res, error)
    }
  }

  //========== LOGIN
  public login = async (req: Request, res: Response): Promise<void> => {
    try {

      const input = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password
      })

      const output = await this.userBusiness.login(input)

      res.status(HTTP_CODE.OK).send(output)

    } catch (error) {
      handlerError(res, error)
    }
  }

  // CREATE ADMIN
  public createAdmin = async (req: Request, res: Response): Promise<void> => {

    try {
      const input = CreateAdminSchema.parse({
        isAdmin: req.body.isAdmin,
        token: req.headers.authorization
      })
      const response = await this.userBusiness.createAdmin(input);
      res.status(HTTP_CODE.OK).send(response)
    } catch (error) {
      handlerError(res, error)
    }
  }

  // CHECK LOGIN
  public checkLogin = async (req: Request, res: Response): Promise<void> => {

    try {
      const input = CheckUserSchema.parse({
        token: req.headers.authorization
      })
      const response = await this.userBusiness.checkLogin(input);
      res.status(HTTP_CODE.OK).send(response)
    }
    // não desejo enviar um retorno de erro para o front
    catch (error) { }
  }

  // RESET PASSWORD
  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = { email: req.params.email }
      const response = await this.userBusiness.resetPassword(input);
      res.status(HTTP_CODE.OK).send('<h4>reset feito com sucesso, cadastre no form de login sua nova senha.<h4/>')
    }
    // não desejo enviar um retorno de erro para o front
    catch (error) { }
  }

  // SENE EMAIL
  public sendEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const email = req.body.email
      const response = await this.userBusiness.sendEmail(email)
      console.log(response)
      res.status(HTTP_CODE.OK).send(response)       
    } catch (error) {
    }
  }
}


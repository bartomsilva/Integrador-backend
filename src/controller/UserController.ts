import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { GetUsersSchema } from "../dtos/users/getUsers.dto"
import { handlerError } from "../error/handlerError"
import { CreateUserSchema } from "../dtos/users/signUp.dto"
import { LoginSchema } from "../dtos/users/login.dto"
import { CreateAdminSchema } from "../dtos/users/createAdmin.dto"
import { HTTP_CODE } from "../util/util"
import { CheckUserSchema } from "../dtos/users/checkUser.dto"
import { ResetPasswordSchema } from "../dtos/users/resetPassword.dto"
import nodemailer from "nodemailer"
import dotenv from 'dotenv'

dotenv.config()

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

    const email = req.body.email

    console.log("email back", email)
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
      from: 'Labeddit',
      to: email,
      subject: "reset password",
      html: `
      <h3>Olá, segue o link para liberar o cadastro de sua nova senha.<h3>
      <a href="http://${process.env.SERVER_PATH}:3003/users/resetpassword/${email}" _self>Clique aqui</a>
      `
    };


    transport.sendMail(message, function (err) {
      if (err) {
        return res.status(400).json({
          erro: true,
          mensagem: "E-mail não enviado com sucesso!"
        })

      } else {
        return res.json({
          erro: false,
          mensagem: "E-mail enviado com sucesso!"
        })

      }

    })


  }
}


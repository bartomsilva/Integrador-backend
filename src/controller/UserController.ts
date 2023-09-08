import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { GetUsersSchema } from "../dtos/users/getUsers.dto"
import { handlerError } from "../error/handlerError"
import { CreateUserSchema } from "../dtos/users/singUp.dto"
import { LoginSchema } from "../dtos/users/login.dto"
import { CreateAdminSchema } from "../dtos/users/createAdmin.dto"
import { HTTP_CODE } from "../util/util"
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

  //=========== SING UP / CREATE USER
  public createUser = async (req: Request, res: Response): Promise<void> => {

    try {
      const input = CreateUserSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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

      await this.userBusiness.createAdmin(input);

      res.sendStatus(HTTP_CODE.OK)

    } catch (error) {
      handlerError(res, error)
    }
  }

}
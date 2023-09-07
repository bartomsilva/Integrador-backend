import { Request, Response } from "express"
import { UserBusiness } from "../../business/users/UserBusiness"
import { GetUsersSchema } from "../../dtos/users/getUsers.dto"
import { handlerError } from "../../error/handlerError"
import { CreateUserSchema } from "../../dtos/users/singUp.dto"
import { LoginSchema } from "../../dtos/users/login.dto"
import { CreateAdminSchema } from "../../dtos/users/createAdmin.dto"
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

      res.status(200).send(output)

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

      res.status(201).send(output)

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

      res.status(200).send(output)

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

      res.sendStatus(200)

    } catch (error) {
      handlerError(res, error)
    }
  }

}
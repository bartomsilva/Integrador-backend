import { AdminDB, UserDB } from "../models/User"
import { BaseDataBase } from "./BaseDataBase"

export class UserDataBase extends BaseDataBase {

  TABLE_NAME = "users"

  //============= SING UP
  public insertUser = async (newUser: UserDB): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME).insert(newUser)
  }

  // GET USERS E ALL USERS
  public getUser = async (q: string): Promise<UserDB[]> => {
    let resultDB: UserDB[]
    if (q) {
      resultDB = await this.findByName(q)
    } else {
      resultDB = await this.findAll()
    }
    return resultDB
  }

  // troca o Status do usuário para admin ou revoga
  public createAdmin = async (idUser: string, userNewStatus: AdminDB): Promise<void> => {
    await BaseDataBase.
      connection(this.TABLE_NAME).
      update(userNewStatus).
      where({ id: idUser })
  }

  // troca o Status para reset de senha
  public resetPassword = async (userEmail: string): Promise<void> => {
    await BaseDataBase.
      connection(this.TABLE_NAME).
      update({"reset_password":"*"}).
      where({ email: userEmail })
  }

   // atualiza a senha no banco de dados
   public updatePassword = async (idUser: string, newPassword:string): Promise<void> => {
    await BaseDataBase.
      connection(this.TABLE_NAME).
      update({"password": newPassword, "reset_password":null}).
      where({ id: idUser })
  }
  //============== BUSCA SE O USUÁRIO JÁ FOI CADASTRADO 
  public findUser = async (email: string): Promise<UserDB> => {
    const [result]: UserDB[] = await BaseDataBase.connection("users").where({ email })
    return result
  }

  // FIND BY ID
  public async findById(id: string): Promise<any> {
    const result = await BaseDataBase.connection(this.TABLE_NAME).where({ id })
    return result
  }

  // FIND BY NAME
  public async findByName(name: string): Promise<UserDB[]> {
    const result = await BaseDataBase.connection(this.TABLE_NAME).where("name", "like", `%${name}%`)
    return result
  }

  // // FIND ALL 
  public async findAll(): Promise<UserDB[]> {
    const result = await BaseDataBase.connection(this.TABLE_NAME)
    return result
  }
}
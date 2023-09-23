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

  
  //============== BUSCA SE O USUÁRIO JÁ FOI CADASTRADO 
  public findUser = async (email: string): Promise<UserDB> => {
    const [result]: UserDB[] = await BaseDataBase.connection("users").where({ email })
    return result
  }

  // FIND BY ID
  public async findById(id: string): Promise<any> {
    return await BaseDataBase.connection(this.TABLE_NAME).where({ id })
  }

  // FIND BY NAME
  public async findByName(name: string): Promise<UserDB[]> {
    return await BaseDataBase.connection(this.TABLE_NAME).where("name", "like", `%${name}%`)
  }

  // // FIND ALL 
  public async findAll(): Promise<UserDB[]> {
    return await BaseDataBase.connection(this.TABLE_NAME)
  }
}
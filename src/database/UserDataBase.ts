import { AdminDB, UserDB } from "../models/User"
import { BaseDataBase } from "./BaseDataBase"

export class UserDataBase extends BaseDataBase {

  TABLE_NAME = "users"

  //============= SING UP
  public insertUser = async (newUser: UserDB): Promise<void> => {
    BaseDataBase.connect()
    await BaseDataBase.connection(this.TABLE_NAME).insert(newUser)
    BaseDataBase.disconnect()
  }

  // GET USERS E ALL USERS
  public getUser = async (q: string): Promise<UserDB[]> => {
    let resultDB: UserDB[]
    BaseDataBase.connect()
    if (q) {
      resultDB = await this.findByName(q)
    } else {
      resultDB = await this.findAll()
    }
    BaseDataBase.disconnect()
    return resultDB
  }

  // troca o Status do usuário para admin ou revoga
  public createAdmin = async (idUser: string, userNewStatus: AdminDB): Promise<void> => {
    BaseDataBase.connect()
    await BaseDataBase.
      connection(this.TABLE_NAME).
      update(userNewStatus).
      where({ id: idUser })
    BaseDataBase.disconnect()
  }

  //============== BUSCA SE O USUÁRIO JÁ FOI CADASTRADO 
  public findUser = async (email: string): Promise<UserDB> => {
    BaseDataBase.connect()
    const [result]: UserDB[] = await BaseDataBase.connection("users").where({ email })
    BaseDataBase.disconnect()
    return result
  }

  // FIND BY ID
  public async findById(id: string): Promise<any> {
    BaseDataBase.connect()
    const result = await BaseDataBase.connection(this.TABLE_NAME).where({ id })
    BaseDataBase.disconnect()
    return result
  }

  // FIND BY NAME
  public async findByName(name: string): Promise<UserDB[]> {
    BaseDataBase.connect()
    const result = await BaseDataBase.connection(this.TABLE_NAME).where("name", "like", `%${name}%`)
    BaseDataBase.disconnect()
    return result
  }

  // // FIND ALL 
  public async findAll(): Promise<UserDB[]> {
    BaseDataBase.connect()
    const result = await BaseDataBase.connection(this.TABLE_NAME)
    BaseDataBase.disconnect()
    return result
  }
}
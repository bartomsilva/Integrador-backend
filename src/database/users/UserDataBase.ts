import { AdminDB, USER_ROLES, UserDB } from "../../models/users/User"
import { BaseDataBase } from "../BaseDataBase"

export class UserDataBase extends BaseDataBase{

  TABLE_NAME = "users"

  //============= SING UP
  public insertUser = async (newUser:UserDB):Promise<void>=>{

    await BaseDataBase.connection(this.TABLE_NAME).insert(newUser)

  }

  //============== BUSCA SE O CLIENTE JÁ FOI CADASTRADO 
  public findUser = async (email:string):Promise<UserDB> =>{
    const [result]:UserDB[] = await BaseDataBase.connection("users").where({email})
    return result
  } 

  // GET USERS E ALL USERS
  public getUser = async (q:string):Promise<UserDB[]> =>{
    let resultDB: UserDB[]
    if(q){
      resultDB = await this.findByName(q)
    } else {
      resultDB = await this.findAll()
    }
        
    return resultDB
  } 

  // troca o Status do usuário para admin ou revoga
  public createAdmin = async (idUser: string, userNewStatus: AdminDB ):Promise<void> =>{
    await BaseDataBase.
    connection(this.TABLE_NAME).
    update(userNewStatus).
    where({id: idUser})
  }
}
import { AdminDB, USER_ROLES, UserDB } from "../../src/models/User"
import { BaseDataBase } from "../../src/database/BaseDataBase"

const usersMock: UserDB[] = [
  {
    id: "id-mock-fulano",
    name: "Fulano",
    email: "fulano@email.com",
    password: "hash-mock-fulano",  // Fulano123@
    role: USER_ROLES.NORMAL,
    created_at: new Date().toISOString()
  },
  {
    id: "id-mock-bart",
    name: "Bart",
    email: "bart@email.com",
    password: "hash-mock-bart",  // Bart123@
    role: USER_ROLES.ADMIN,
    created_at: new Date().toISOString()
  }
]

export class UserDataBaseMock extends BaseDataBase {

  TABLE_NAME = "users"

  //============= SING UP
  public insertUser = async (newUser: UserDB): Promise<void> => {
    // void
  }

  //============== BUSCA SE O CLIENTE JÁ FOI CADASTRADO 
  public findUser = async (email: string): Promise<UserDB> => {
    const [result]: UserDB[] = usersMock.filter(user => user.email === email)
    return result
  }

  // GET USERS E ALL USERS 
  public getUser = async (q: string): Promise<UserDB[]> => {
    let resultDB: UserDB[]
    if (q) {
      resultDB = await this.findByName(q)
      // usersMock.filter(user => user.name.toLowerCase().includes(q.toLowerCase()))
    } else {
      resultDB = await this.findAll()
    }
    return resultDB
  }

  // troca o Status do usuário para admin ou revoga
  public createAdmin = async (idUser: string, userNewStatus: AdminDB): Promise<void> => {

  }


  // FIND BY ID
  public async findById(id: string): Promise<any> {
    return usersMock.filter(user => user.id == id)
  }

  // FIND BY NAME
  public async findByName(name: string): Promise<UserDB[]> {
    return usersMock.filter(user => user.name.includes(name))

  }

  // // FIND ALL 
  public async findAll(): Promise<UserDB[]> {
    return usersMock
  }




}
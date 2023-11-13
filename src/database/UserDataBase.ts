import mongoose from 'mongoose';
import { AdminDB, UserDB } from "../models/User";
import { BaseDataBase } from "./BaseDataBase";
import User from './models/users.db';


export class UserDataBase extends BaseDataBase {
  
  TABLE_NAME = "users";

  //============= CADASTRO DE USUÁRIO
  public insertUser = async (newUser: UserDB): Promise<void> => {
    const UserModel = mongoose.model<UserDB>('Users') 
    const newUserDB = new User(newUser)
    const userInstance = new UserModel(newUserDB)
    await userInstance.save()
  }
  
  // OBTÉM USUÁRIOS E TODOS OS USUÁRIOS
  public getUser = async (q: string): Promise<UserDB[]> => {
    let resultDB: UserDB[];
    if (q) {
      resultDB = await this.findByName(q)
    } else {
      resultDB = await this.findAll()
    }
    return resultDB;
  }

  // Altera o status do usuário para admin ou revoga
  public createAdmin = async (idUser: string, userNewStatus: AdminDB): Promise<void> => {
    const UserModel = mongoose.model<UserDB>('Users') 
    await UserModel.updateOne({ id: idUser }, { $set: userNewStatus });
  }
  

  // Altera o status para reset de senha
  public resetPassword = async (userEmail: string): Promise<void> => {
    const UserModel = mongoose.model<UserDB>('Users')
    await UserModel.updateOne({ email: userEmail }, { $set: { "reset_password": "*" } })
  }
  

  // Atualiza a senha no banco de dados
  public updatePassword = async (idUser: string, newPassword: string): Promise<void> => {
    const UserModel = mongoose.model<UserDB>('Users') 
    await UserModel.updateOne(
      { id: idUser },
      { $set: { "password": newPassword, "reset_password": null } }
    );
  }
  

  //============== VERIFICA SE O USUÁRIO JÁ FOI CADASTRADO 
  public findUser = async (email: string): Promise<UserDB|any> => {
    const UserModel = mongoose.model<UserDB>('Users') 
    const result: UserDB|any = await UserModel.findOne({ email })
    return result;
  }
  

  // BUSCA POR ID
  public async findById(id: string): Promise<any> {
    // const UserModel = mongoose.model<UserDB>('Users') 
    //const result = await UserModel.findOne({ id })
    const result = await mongoose.model('Users').findOne({ id })
    return result;
  }
  

  // BUSCA POR NOME
  public async findByName(name: string): Promise<UserDB[]> {
    // const UserModel = mongoose.model<UserDB>('Users') 
    const result = await mongoose.model('Users').find({ "name": { $regex: new RegExp(name, 'i') } }).exec()
    return result
  }
  

  // BUSCA TODOS OS USUÁRIOS
  public async findAll(): Promise<UserDB[]> {
    // const UserModel = mongoose.model<UserDB>('Users') 
    const result = await mongoose.model('Users').find()
    return result;
  }
}  

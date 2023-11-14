import mongoose from 'mongoose';
import { AdminDB, UserDB } from "../models/User";
import { BaseDataBase } from "./BaseDataBase";
import { userSchema } from './models/users.db';


export class UserDataBase extends BaseDataBase {

  TABLE_NAME = 'Users';
  UserModel = mongoose.model<UserDB>(this.TABLE_NAME, userSchema)

  //============= CADASTRO DE USUÁRIO
  public insertUser = async (newUser: UserDB): Promise<UserDB> => {
    const response = await this.UserModel.create(newUser);
    return response;
  }


  // OBTÉM USUÁRIOS E TODOS OS USUÁRIOS
  public getUser = async (q: string): Promise<UserDB[]> => {
    let resultDB: UserDB[] | any;
    if (q) {
      resultDB = await this.findByName(q)
    } else {
      resultDB = await this.findAll()
    }
    return resultDB;
  }

  // Altera o status do usuário para admin ou revoga
  public createAdmin = async (idUser: string, userNewStatus: AdminDB): Promise<void> => {
    await this.UserModel
      .updateOne({ _id: idUser }, { $set: userNewStatus });
  }

  // Altera o status para reset de senha
  public resetPassword = async (userEmail: string): Promise<void> => {
    await this.UserModel
      .updateOne({ email: userEmail }, { $set: { "reset_password": "*" } })
  }

  // Atualiza a senha no banco de dados
  public updatePassword = async (idUser: string, newPassword: string): Promise<void> => {
    await this.UserModel
      .updateOne(
        { _id: idUser },
        { $set: { "password": newPassword, "reset_password": null } }
      );
  }

  //============== VERIFICA SE O USUÁRIO JÁ FOI CADASTRADO 
  public findUser = async (email: string): Promise<UserDB | null> => {
    const result = await this.UserModel.findOne({ email })
    return result || null
  }

  // BUSCA POR ID
  public async findById(id: string): Promise<UserDB | null> {
    // const UserModel = mongoose.model<UserDB>(this.TABLE_NAME)
    const result = await this.UserModel.findOne({ _id: id })
    return result || null
  }

  // BUSCA POR NOME
  public async findByName(name: string): Promise<UserDB[] | null> {
    // const UserModel = mongoose.model<UserDB>(this.TABLE_NAME)
    const result = await this.UserModel.find({ name: { $regex: new RegExp(name, 'i') } }).exec()
    return result
  }

  // BUSCA TODOS OS USUÁRIOS
  public async findAll(): Promise<UserDB[] | null> {
    const result = await this.UserModel
      .find()
    return result || null
  }

}
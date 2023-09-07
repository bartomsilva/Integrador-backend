import { knex } from "knex"
import dotenv from "dotenv"
import { ActionDB } from "../models/posts/Post"
dotenv.config()
export abstract class BaseDataBase {

    protected static connection = knex({
        client: "sqlite3",
        connection: {
            filename: process.env.DB_FILE_PATH as string,
        },
        useNullAsDefault: true,
        pool: {
            min: 0,
            max: 1,
            afterCreate: (conn: any, cb: any) => {
                conn.run("PRAGMA foreign_keys = ON", cb)
            }
        }
    })

    public abstract TABLE_NAME: string

    // FIND BY ID
    public async findById(id: string): Promise<any> {
        return await BaseDataBase.connection(this.TABLE_NAME).where({ id })
    }

    // FIND BY NAME
    public async findByName(name: string): Promise<any> {
        return await BaseDataBase.connection(this.TABLE_NAME).where("name", "like", `%${name}%`)
    }

    // FIND ALL 
    public async findAll(): Promise<any> {
        return await BaseDataBase.connection(this.TABLE_NAME)
    }

    //============= FIND POST
    public async findPost(id: string): Promise<ActionDB[]> {
        const result: ActionDB[] = await BaseDataBase.connection("posts").where({ id })
        return result
    }
    //============= FIND COMMENT
    public async findComment(id: string): Promise<ActionDB[]> {
        const result: ActionDB[] = await BaseDataBase.connection("comments").where({ id })
        return result
    }

}

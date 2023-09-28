import knex, { Knex } from 'knex';
import dotenv from "dotenv"
import { LikesDislikesDB, PostDB } from "../models/Post"
import { CommentDB } from "../models/Comments"
dotenv.config()
export abstract class BaseDataBase {

    protected static connection: Knex;

    protected static connect(): void {
        if (!BaseDataBase.connection) {
            BaseDataBase.connection = knex({
                client: 'sqlite3',
                connection: {
                    filename: process.env.DB_FILE_PATH as string,
                },
                useNullAsDefault: true,
                pool: {
                    min: 0,
                    max: 1,
                    afterCreate: (conn: any, cb: any) => {
                        conn.run('PRAGMA foreign_keys = ON', cb);
                    },
                },
            });
        }
    }

    protected static async disconnect(): Promise<void> {
        // if (BaseDataBase.connection) {
            // await BaseDataBase.connection.destroy();
            // BaseDataBase.connection = undefined;
        // }
    }

    public abstract TABLE_NAME: string

    //============= FIND POST
    public async findPost(id: string): Promise<PostDB[]> {
        BaseDataBase.connect()
        const result: PostDB[] = await BaseDataBase.connection("posts").where({ id })
        await BaseDataBase.disconnect()
        return result
    }

    //============= FIND COMMENT
    public async findComment(id: string): Promise<CommentDB[]> {
        BaseDataBase.connect()
        const result: CommentDB[] = await BaseDataBase.connection("comments").where({ id })
        await BaseDataBase.disconnect()
        return result
    }

    // busca os detalhes de like / dislike
    public findLikeDislike = async (actionId: string, userId: string): Promise<LikesDislikesDB> => {
        BaseDataBase.connect()
        const [resultDB]: LikesDislikesDB[] = await BaseDataBase.connection("likes_dislikes")
            .where({ action_id: actionId })
            .andWhere({ user_id: userId })
        await BaseDataBase.disconnect()
        return resultDB
    }
}

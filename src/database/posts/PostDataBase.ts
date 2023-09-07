import { PostDB, PostResultDB, PostUpdateDB } from "../../models/posts/Post";
import { BaseDataBase } from "../BaseDataBase";

export class PostDataBase extends BaseDataBase {

  TABLE_NAME = "posts"

  //=============== INSERT POST
  public insertPost = async (newPost: PostDB): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME).insert(newPost)
  }

  //=============== UPDATE POST 
  public updatePost = async (updatePost: PostUpdateDB, creatorId: string): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME)
      .update(updatePost)
      .where("id", "=", updatePost.id)
      .andWhere("creator_id", "=", creatorId)
  }

  //=============== DELETE POST 
  public deletePost = async (postId: string): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME)
      .del().where("id", "=", postId)
  }

  //============ GET ALL POST
  public getPost = async ():Promise<PostResultDB[]> => {

    const output: PostResultDB[] =  await BaseDataBase.connection("posts as p")
      .select("p.id", "p.content", "p.likes", "p.dislikes", "p.created_at",
        "p.updated_at", "p.creator_id", "u.name as creator_name")
      .innerJoin("users as u", "p.creator_id", "u.id")
      return output
  }
}


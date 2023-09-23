import { PostDB, PostResultDB, PostUpdateDB } from "../models/Post";
import { BaseDataBase } from "./BaseDataBase";
import { CommentDataBase } from "./CommentDatabase";

export class PostDataBase extends BaseDataBase {

  TABLE_NAME = "posts"

  //============ GET ALL POST
  public getPost = async (): Promise<PostResultDB[]> => {

    const response = await BaseDataBase.connection("posts as p")
      .select("p.id", "p.content", "p.likes", "p.dislikes", "p.comments", "p.created_at",
        "p.updated_at", "p.creator_id", "u.name as creator_name")
      .leftJoin("users as u", "p.creator_id", "u.id")
      .orderBy("p.updated_at", "desc")
    return response
  }

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

    // procurar comentários ligados ao post 
    const commentIds = await BaseDataBase.connection('comments')
      .pluck('id') // pluck pega apenas essa coluna
      .where('post_id', postId)

    // remover os likes do post
    await BaseDataBase.connection('likes_dislikes')
      .del()
      .where('action_id', postId)

    // remover os likes dos comentários ligados ao post
    await BaseDataBase.connection('likes_dislikes')
      .del()
      .whereIn('action_id', commentIds)

    // remover os comentários ligados ao post
    await BaseDataBase.connection('comments')
      .del()
      .where('post_id', postId)

    // remover o post
    await BaseDataBase.connection('posts')
      .del()
      .where('id', postId)
  }

}
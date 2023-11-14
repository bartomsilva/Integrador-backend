import mongoose, { Document, Schema, Model } from 'mongoose';
import { PostDB, PostResultDB, PostUpdateDB } from "../models/Post";
import { BaseDataBase } from "./BaseDataBase";
import { Post,postSchema } from './models/posts.db';
import { commentSchema } from './models/comments.db';
import { likeDislikeSchema } from './models/likesdislikes.db';

export class PostDataBase extends BaseDataBase {

  TABLE_NAME = "Posts";

  //============= GET ALL POST
  public getPost = async (): Promise<PostResultDB[] | any> => {
    
    const PostModel = mongoose.model<PostDB>(this.TABLE_NAME,postSchema) 

    const response = await PostModel.find()
      .select("_id content likes dislikes comments created_at updated_at creator_id")
      .populate('creator_id', 'name') 
      .sort({ updated_at: -1 });
      console.log("modelo",response)
    return response ;
  } 
 
  //=============== INSERT POST
  public insertPost = async (newPost: PostDB): Promise<void> => {
    const PostModel = mongoose.model<PostDB>(this.TABLE_NAME) 
    const newPostDB = new Post(newPost)
    const postInstance = new PostModel(newPostDB);
    await postInstance.save();
  } 

  //=============== UPDATE POST 
  public updatePost = async (updatePost: PostUpdateDB, creatorId: string): Promise<void> => {
   const PostModel = mongoose.model<PostDB>(this.TABLE_NAME) 
   await PostModel.updateOne({ _id: updatePost.id, creator_id: creatorId }, updatePost);
  }

  //=============== DELETE POST 
  public deletePost = async (postId: string): Promise<void> => {
    const PostModel = mongoose.model<PostDB>(this.TABLE_NAME, postSchema) 
    
    // Remova os likes do post
    await mongoose.model('LikesDislikes', likeDislikeSchema).deleteMany({ action_id: postId });

    // Remova os comentários ligados ao post
    await mongoose.model('Comment',commentSchema).deleteMany({ post_id: postId });

    // Remova o post
    await PostModel.deleteOne({ _id: postId });
  }
}


  // //=============== DELETE POST 
  // public deletePost = async (postId: string): Promise<void> => {
  //   // procurar comentários ligados ao post 
  //   const commentIds = await BaseDataBase.connection('comments')
  //     .pluck('id') // pluck pega apenas essa coluna
  //     .where('post_id', postId)

  //   // remover os likes do post
  //   await BaseDataBase.connection('likes_dislikes')
  //     .del()
  //     .where('action_id', postId)

  //   // remover os likes dos comentários ligados ao post
  //   await BaseDataBase.connection('likes_dislikes')
  //     .del()
  //     .whereIn('action_id', commentIds)

  //   // remover os comentários ligados ao post
  //   await BaseDataBase.connection('comments')
  //     .del()
  //     .where('post_id', postId)

  //   // remover o post
  //   await BaseDataBase.connection('posts')
  //     .del()
  //     .where('id', postId)
  // }


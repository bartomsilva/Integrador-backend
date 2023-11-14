import mongoose, { Document, Schema, Model } from 'mongoose';
import { PostDB, PostResultDB, PostUpdateDB } from "../models/Post";
import { BaseDataBase } from "./BaseDataBase";
import Post from './models/posts.db';
// const User = require('./models/users.db'); // Importe o modelo User

export class PostDataBase extends BaseDataBase {

  TABLE_NAME = "posts";

  //============= GET ALL POST
  public getPost = async (): Promise<PostResultDB[] | any> => {
    const PostModel = mongoose.model<PostDB>('Posts') 
    const response = await PostModel.find()
      .select("_id content likes dislikes comments created_at updated_at creator_id")
      .populate('creator', 'name') 
      .sort({ updated_at: -1 });
    return response ;
  } 
 
  //=============== INSERT POST
  public insertPost = async (newPost: PostDB): Promise<void> => {
    const PostModel = mongoose.model<PostDB>('Posts') 
    const newPostDB = new Post(newPost)
    const postInstance = new PostModel(newPostDB);
    await postInstance.save();
  }

  //=============== UPDATE POST 
  public updatePost = async (updatePost: PostUpdateDB, creatorId: string): Promise<void> => {
   const PostModel = mongoose.model<PostDB>('Posts') 
   await PostModel.updateOne({ id: updatePost.id, creator_id: creatorId }, updatePost);
  }

  //=============== DELETE POST 
  public deletePost = async (postId: string): Promise<void> => {
    const PostModel = mongoose.model<PostDB>('Posts') 
    // Remova os likes do post
    await mongoose.model('LikesDislikes').deleteMany({ action_id: postId });

    // Remova os comentários ligados ao post
    await mongoose.model('Comment').deleteMany({ post_id: postId });

    // Remova o post
    await PostModel.deleteOne({ id: postId });
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


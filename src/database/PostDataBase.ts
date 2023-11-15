import mongoose, { Document, Schema, Model } from 'mongoose';
import { LikesDislikesDB, PostDB, PostResultDB, PostUpdateDB } from "../models/Post";
import { BaseDataBase } from "./BaseDataBase";
import { Post,postSchema } from './models/posts.db';
import { commentSchema } from './models/comments.db';
import { likeDislikeSchema } from './models/likesdislikes.db';
import { CommentDB } from '../models/Comments';

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
    const CommentModel = mongoose.model<CommentDB>('Comments') 
    const LikeDislikeModel = mongoose.model<LikesDislikesDB>('LikesDislikes') 

    // Procurar comentários ligados ao post
    const comments = await CommentModel.find({ post_id : postId });

    // Coletar os IDs dos comentários
    const commentIds = comments.map(comment => comment._id);

    // Remover os likes dos comentários ligados ao post
    await LikeDislikeModel.deleteMany({ action_id: { $in: commentIds } });

    // Remova os likes do post
    // await mongoose.model('LikesDislikes', likeDislikeSchema).deleteMany({ action_id: postId });
    await LikeDislikeModel.deleteMany({ action_id: postId });

    // Remova os comentários ligados ao post
    // await mongoose.model('Comment',commentSchema).deleteMany({ post_id: postId });
    await CommentModel.deleteMany({ post_id: postId });

    // Remova o post
    await PostModel.deleteOne({ _id: postId });
  }
}


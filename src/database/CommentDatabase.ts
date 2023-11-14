import mongoose from 'mongoose';
import { CommentDB, CommentResultDB, CommentUpdateDB } from "../models/Comments";
import { BaseDataBase } from "./BaseDataBase";
import Comment from './models/comments.db';
// const User = require('./models/users.db'); // Importe o modelo User


export class CommentDataBase extends BaseDataBase {

  TABLE_NAME = "Comments";


  //=============== INSERT COMMENT
  public insertComment = async (newComment: CommentDB): Promise<void> => {
    const CommentModel = mongoose.model<CommentDB>(this.TABLE_NAME) 
    const newCommentDB = new Comment(newComment)
    const commentInstance = new CommentModel(newCommentDB);
    await commentInstance.save();
  }

  //=============== UPDATE COMMENT 
  public updateComment = async (updateComment: CommentUpdateDB, creatorId: string): Promise<void> => {
    const CommentModel = mongoose.model<CommentDB>(this.TABLE_NAME) 
    await CommentModel.updateOne({ id: updateComment.id, creator_id: creatorId }, updateComment);
  }

  //=============== DELETE COMMENT 
  public deleteComment = async (commentId: string): Promise<void> => {
    const CommentModel = mongoose.model<CommentDB>(this.TABLE_NAME) 
    // Remova os likes do comentário
    await mongoose.model('LikesDislikes').deleteMany({ action_id: commentId });

    // Remova o comentário
    await CommentModel.deleteOne({ id: commentId });
  }

  //============ GET COMMENTS FOR POST
  public getComment = async (postId: string): Promise<CommentResultDB[]|any> => {
    const CommentModel = mongoose.model<CommentDB>(this.TABLE_NAME) 
    const output = await CommentModel.find({ post_id: postId })
      .select("_id post_id content likes dislikes comments creator_id created_at updated_at")
      .populate('creator', 'name') // Adiciona a referência populada do criador
      .sort({ updated_at: -1 });
    return output;
  }

  // Rotina que incrementa o número de comentários nos posts
  public incrementComments = async (postId: string): Promise<void> => {
    await mongoose.model('Posts').updateOne({ id: postId }, { $inc: { comments: 1 } });
  }

  // Rotina que decrementa o número de comentários nos posts
  public decrementComments = async (postId: string): Promise<void> => {
    await mongoose.model('Posts').updateOne({ id: postId }, { $inc: { comments: -1 } });
  }
}

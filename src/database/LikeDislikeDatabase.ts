import mongoose from 'mongoose';
import { LikesDislikesDB } from "../models/Post"
import { BaseDataBase } from "./BaseDataBase"

export class LikeDislikeDatabase extends BaseDataBase {

  TABLE_NAME = "LikesDislikes"

  //======================  INSERT LIKE DISLIKE
  public insertLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
      await mongoose.model<LikesDislikesDB>(this.TABLE_NAME).create(likeDislike);
  }

  //====================== UPDATE LIKE DISLIKE  - atualiza o status do like
  public updateLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
    const LikeDislikeModel = mongoose.model<LikesDislikesDB>(this.TABLE_NAME)
    await LikeDislikeModel.updateOne(
      { user_id: likeDislike.user_id, action_id: likeDislike.action_id },
      { $set: { "like": likeDislike.like } }
    )
  }

  //=====================  DELETE LIKE DISLIKE
  public deleteLikeDislike = async (actionId: string, userId: string): Promise<void> => {
    const LikeDislikeModel = mongoose.model<LikesDislikesDB>(this.TABLE_NAME)
    await LikeDislikeModel.deleteOne({ action_id: actionId, user_id: userId });
  }
  //======================= LIKES E DISLIKES IN POSTS   
  // soma um ao like  
  public postIncreaseLike = async (action: string, id: string): Promise<void> => {
    const LikeDislikeModel = mongoose.model<LikesDislikesDB>(action=='posts'?'Posts':'Comments')
    await LikeDislikeModel.updateOne({ id }, { $inc: { likes: 1 } });
  }

  // subtrai um do like
  public postDecreaseLike = async (action: string, id: string): Promise<void> => {
    const LikeDislikeModel = mongoose.model<LikesDislikesDB>(action=='posts'?'Posts':'Comments')
    await LikeDislikeModel.updateOne({ id }, { $inc: { likes: -1 } });
  }

  // soma um ao dislike
  public postIncreaseDislike = async (action: string, id: string): Promise<void> => {
    const LikeDislikeModel = mongoose.model<LikesDislikesDB>(action=='posts'?'Posts':'Comments')
    await LikeDislikeModel.updateOne({ id }, { $inc: { dislikes: 1 } });
  }

  // subtrai um do dislike
  public postDecreaseDislike = async (action: string, id: string): Promise<void> => {
    const LikeDislikeModel = mongoose.model<LikesDislikesDB>(action=='posts'?'Posts':'Comments')
    await LikeDislikeModel.updateOne({ id }, { $inc: { dislikes: -1 } });
  }

  // atualiza o status - de Like para Dislike
  public postReverseDislikeToLike = async (action: string, id: string): Promise<void> => {
    const LikeDislikeModel = mongoose.model<LikesDislikesDB>(action=='posts'?'Posts':'Comments')
    await LikeDislikeModel.updateOne({ id }, { $inc: { likes: 1, dislikes: -1 } });

  }

  // atualiza o status - de Dislike para Like
  public postReverseLikeToDislike = async (action: string, id: string): Promise<void> => {
    const LikeDislikeModel = mongoose.model<LikesDislikesDB>(action=='posts'?'Posts':'Comments')
    await LikeDislikeModel.updateOne({ id }, { $inc: { likes: -1, dislikes: 1 } });
  }
}
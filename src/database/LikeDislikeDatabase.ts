import { LikesDislikesDB } from "../models/Post"
import { BaseDataBase } from "./BaseDataBase"

export class LikeDislikeDatabase extends BaseDataBase {

  TABLE_NAME = "likes_dislikes"

  //======================  INSERT LIKE DISLIKE
  public insertLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
    BaseDataBase.connect()
    await BaseDataBase.connection(this.TABLE_NAME).insert(likeDislike)
    BaseDataBase.disconnect()
  }

  //====================== UPDATE LIKE DISLIKE  - atualiza o status do like
  public updateLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
    BaseDataBase.connect()
    await BaseDataBase.connection(this.TABLE_NAME)
      .update({ like: likeDislike.like })
      .where({ user_id: likeDislike.user_id })
      .andWhere({ action_id: likeDislike.action_id })
    BaseDataBase.disconnect()

  }

  //=====================  DELETE LIKE DISLIKE
  public deleteLikeDislike = async (actionId: string, userId: string): Promise<void> => {
    BaseDataBase.connect()
    await BaseDataBase.connection("likes_dislikes")
      .del()
      .where({ action_id: actionId })
      .andWhere({ user_id: userId })
    BaseDataBase.disconnect()
  }

  //======================= LIKES E DISLIKES IN POSTS   
  // soma um ao like  
  public postIncreaseLike = async (action: string, id: string): Promise<void> => {
    BaseDataBase.connect()
    await BaseDataBase.connection(action)
      .where({ id })
      .increment("likes")
    BaseDataBase.disconnect()
  }

  // subtrai um do like
  public postDecreaseLike = async (action: string, id: string): Promise<void> => {
    BaseDataBase.connect()
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("likes")
    BaseDataBase.disconnect()
  }

  // soma um ao dislike
  public postIncreaseDislike = async (action: string, id: string): Promise<void> => {
    BaseDataBase.connect()
    await BaseDataBase.connection(action)
      .where({ id })
      .increment("dislikes")
    BaseDataBase.disconnect()
  }

  // subtrai um do dislike
  public postDecreaseDislike = async (action: string, id: string): Promise<void> => {
    BaseDataBase.connect()
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("dislikes")
    BaseDataBase.disconnect()
  }

  // atualiza o status - de Like para Dislike
  public postReverseDislikeToLike = async (action: string, id: string): Promise<void> => {
    BaseDataBase.connect()
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("dislikes")
      .increment("likes")
    BaseDataBase.disconnect()
  }

  // atualiza o status - de Dislike para Like
  public postReverseLikeToDislike = async (action: string, id: string): Promise<void> => {
    BaseDataBase.connect()
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("likes")
      .increment("dislikes")
    BaseDataBase.disconnect()
  }
}
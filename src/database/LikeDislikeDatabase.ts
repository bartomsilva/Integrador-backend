import { LikesDislikesDB } from "../models/Post"
import { BaseDataBase } from "./BaseDataBase"

export class LikeDislikeDatabase extends BaseDataBase {

  TABLE_NAME = "likes_dislikes"

  //======================  INSERT LIKE DISLIKE
  public insertLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {

    await BaseDataBase.connection(this.TABLE_NAME).insert(likeDislike)

  }

  //====================== UPDATE LIKE DISLIKE  - atualiza o status do like
  public updateLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME)
      .update({ like: likeDislike.like })
      .where({ user_id: likeDislike.user_id })
      .andWhere({ action_id: likeDislike.action_id })
  }

  //=====================  DELETE LIKE DISLIKE
  public deleteLikeDislike = async (actionId: string, userId: string): Promise<void> => {
    await BaseDataBase.connection("likes_dislikes")
      .del()
      .where({ action_id: actionId })
      .andWhere({ user_id: userId })
  }


  //======================= LIKES E DISLIKES IN POSTS   
  // soma um ao like  
  public postIncreaseLike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .increment("likes")
  }

  // subtrai um do like
  public postDecreaseLike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("likes")
  }

  // soma um ao dislike
  public postIncreaseDislike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .increment("dislikes")
  }

  // subtrai um do dislike
  public postDecreaseDislike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("dislikes")
  }

  // atualiza o status - de Like para Dislike
  public postReverseDislikeToLike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("dislikes")
      .increment("likes")
  }

  // atualiza o status - de Dislike para Like
  public postReverseLikeToDislike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("likes")
      .increment("dislikes")
  }
 

}
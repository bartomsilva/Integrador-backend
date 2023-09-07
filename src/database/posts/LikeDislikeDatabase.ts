import { LikesDislikesDB } from "../../models/posts/Post"
import { BaseDataBase } from "../BaseDataBase"

export class LikesDislikesDatabase extends BaseDataBase {

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
      .andWhere({ post_id: likeDislike.post_id })
  }

  //=====================  DELETE LIKE DISLIKE
  public deleteLikeDislike = async (PostId: string, UserId: string): Promise<void> => {
    await BaseDataBase.connection("likes_dislikes")
      .del()
      .where({ post_id: PostId })
      .andWhere({ user_id: UserId })
  }


  //======================= LIKES E DISLIKES IN POSTS   
  // soma um ao like  
  public postIncreaseLike = async (id: string): Promise<void> => {
    await BaseDataBase.connection("posts")
      .where({ id })
      .increment("likes")
  }

  // subtrai um do like
  public postDecreaseLike = async (id: string): Promise<void> => {
    await BaseDataBase.connection("posts")
      .where({ id })
      .decrement("likes")
  }

  // soma um ao dislike
  public postIncreaseDislike = async (id: string): Promise<void> => {
    await BaseDataBase.connection("posts")
      .where({ id })
      .increment("dislikes")
  }

  // subtrai um do dislike
  public postDecreaseDislike = async (id: string): Promise<void> => {
    await BaseDataBase.connection("posts")
      .where({ id })
      .decrement("dislikes")
  }

  // atualiza o status - de Like para Dislike
  public postReverseDislikeToLike = async (id: string): Promise<void> => {
    await BaseDataBase.connection("posts")
      .where({ id })
      .decrement("dislikes")
      .increment("likes")
  }

  // atualiza o status - de Dislike para Like
  public postReverseLikeToDislike = async (id: string): Promise<void> => {
    await BaseDataBase.connection("posts")
      .where({ id })
      .decrement("likes")
      .increment("dislikes")
  }

  // busca os detalhes de like / dislike
  public findLikeDislike = async (Post_Id: string, User_Id: string): Promise<LikesDislikesDB> => {
    const [resultDB]: LikesDislikesDB[] = await BaseDataBase.connection("likes_dislikes")
      .where({ post_id: Post_Id })
      .andWhere({ user_id: User_Id })
    return resultDB
  }
}
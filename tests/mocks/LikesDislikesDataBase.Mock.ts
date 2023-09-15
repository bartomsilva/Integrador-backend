import { LikesDislikesDB, PostDB } from "../../src/models/Post"
import { BaseDataBase } from "../../src/database/BaseDataBase"
import { postMock } from "./PostDataBase.Mock"
import { commentMock } from "./CommentDataBase.Mock"
import { CommentDB } from "../../src/models/Comments"

export const liksMock = [{
  action_id: "id-mock-post1",
  user_id: "id-mock-fulano",
  like: 1
},
{
  action_id: "id-mock-post3",
  user_id: "id-mock-bart",
  like: 0
},
{
  action_id: "id-mock-comment-1",
  user_id: "id-mock-fulano",
  like: 0
},
{
  action_id: "id-mock-comment-2",
  user_id: "id-mock-fulano",
  like: 1
}



]

export class LikesDislikesDataBaseMock extends BaseDataBase {

  TABLE_NAME = "likes_dislikes"

  //======================  INSERT LIKE DISLIKE
  public insertLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
  }

  //====================== UPDATE LIKE DISLIKE  - atualiza o status do like
  public updateLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
  }

  //=====================  DELETE LIKE DISLIKE
  public deleteLikeDislike = async (actionId: string, userId: string): Promise<void> => {

  }


  //======================= LIKES E DISLIKES IN POSTS   
  // soma um ao like  
  public postIncreaseLike = async (action: string, id: string): Promise<void> => {
  }

  // subtrai um do like
  public postDecreaseLike = async (action: string, id: string): Promise<void> => {
  }

  // soma um ao dislike
  public postIncreaseDislike = async (action: string, id: string): Promise<void> => {
  }

  // subtrai um do dislike
  public postDecreaseDislike = async (action: string, id: string): Promise<void> => {
  }

  // atualiza o status - de Like para Dislike
  public postReverseDislikeToLike = async (action: string, id: string): Promise<void> => {
  }

  // atualiza o status - de Dislike para Like
  public postReverseLikeToDislike = async (action: string, id: string): Promise<void> => {
  }

  // busca os detalhes de like / dislike
  public findLikeDislike = async (actionId: string, userId: string): Promise<LikesDislikesDB> => {
    const [resultDB]: LikesDislikesDB[] = liksMock
      .filter(like => like.action_id == actionId && like.user_id == userId)
    return resultDB
  }

  //============= FIND POST
  public async findPost(id: string): Promise<PostDB[]> {
    const result: PostDB[] = postMock.filter(post => post.id == id)
    return result
  }

  public async findComment(id: string): Promise<CommentDB[]> {
    const result: CommentDB[] = commentMock.filter(comment => comment.id == id)
    return result
  }


}
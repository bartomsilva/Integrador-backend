import { CommentDB, CommentResultDB, CommentUpdateDB } from "../../src/models/Comments";
import { BaseDataBase } from "../../src/database/BaseDataBase";
import { LikesDislikesDB, PostDB } from "../../src/models/Post";
import { postMock } from "./PostDataBase.Mock";
import { liksMock } from "./LikesDislikesDataBase.Mock";

export const commentMock = [
  {
    id: "id-mock-comment-1",
    post_id: "id-mock-post1",
    creator_id: "id-mock-fulano",
    //creator_name: "fulano",
    parental_post_id: "",
    content: "comment mock",
    likes: 0,
    dislikes: 0,
    comments: 0,
    created_at: "",
    updated_at: ""
  },
  {
    id: "id-mock-comment-2",
    post_id: "id-mock-post1",
    creator_id: "id-mock-bart",
    // creator_name: "bart",
    parental_post_id: "",
    content: "comment mock",
    likes: 0,
    dislikes: 0,
    comments: 0,
    created_at: "",
    updated_at: ""
  }
]

export class CommentDataBaseMock extends BaseDataBase {

  TABLE_NAME = "comments"

  //=============== INSERT COMMENT
  public insertComment = async (newComment: CommentDB): Promise<void> => {
  }

  //=============== UPDATE COMMENT 
  public updateComment = async (updateComment: CommentUpdateDB, creatorId: string): Promise<void> => {
  }

  //=============== DELETE COMMENT 
  public deleteComment = async (commentId: string): Promise<void> => {
  }

  //============ GET COMMENTS FOR POST
  public getComment = async (postId: string): Promise<CommentResultDB[]> => {

    const newArray = commentMock.map(objeto => ({
      ...objeto,
      creator_name: objeto.creator_id
    }));

    const output: CommentResultDB[] = newArray.filter(comment => comment.post_id == postId)

    return output
  }

  // rotitna de que incrementa o número de comentarios dos posts
  public incrementComments = async (postId: string): Promise<void> => {
  }
  // rotitna de que decrementa o número de comentarios dos posts
  public decrementComments = async (postId: string): Promise<void> => {
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

    // busca os detalhes de like / dislike
    public findLikeDislike = async (actionId: string, userId: string): Promise<LikesDislikesDB> => {
      const [resultDB]: LikesDislikesDB[] = liksMock
        .filter(like => like.action_id == actionId && like.user_id == userId)
      return resultDB
    }
  
}

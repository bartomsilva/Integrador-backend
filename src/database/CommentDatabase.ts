import { CommentDB, CommentResultDB, CommentUpdateDB } from "../models/Comments";
import { BaseDataBase } from "./BaseDataBase";

export class CommentDataBase extends BaseDataBase {

  TABLE_NAME = "comments"

  //=============== INSERT COMMENT
  public insertComment = async (newComment: CommentDB): Promise<void> => {
    console.log("estou na commentDatabase", newComment)
    await BaseDataBase.connection("comments").insert(newComment)
  }

  //=============== UPDATE COMMENT 
  public updateComment = async (updateComment: CommentUpdateDB, creatorId: string): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME)
      .update(updateComment)
      .where("id", "=", updateComment.id)
      .andWhere("creator_id", "=", creatorId)
  }

  //=============== DELETE COMMENT 
  public deleteComment = async (commentId: string): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME)
      .del().where("id", "=", commentId)
  }

  //============ GET COMMENTS FOR POST
  public getComment = async (postId: string):Promise<CommentResultDB[]> => {

    const output:CommentResultDB[] =  await BaseDataBase.connection("comments as p")
      .select("p.id","p.post_id", "p.content", "p.likes", "p.dislikes",
      "p.comments","p.creator_id", "u.name as creator_name")        
      .innerJoin("users as u", "p.creator_id", "u.id")
      .where({post_id: postId})
      return output
  }
}

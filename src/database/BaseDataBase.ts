import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { LikesDislikesDB, PostDB } from '../models/Post';
import { CommentDB } from '../models/Comments';

dotenv.config();

export abstract class BaseDataBase {
  
  protected static uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}/labeddit?retryWrites=true&w=majority`
  
  protected static connection = mongoose.connect(this.uri as string)

  public abstract TABLE_NAME: string;

  //============= FIND POST
  public async findPost(id: string): Promise<PostDB[]> {
    const result: PostDB[] = await mongoose.model('Posts').find({ id });
    return result;
  }

  //============= FIND COMMENT
  public async findComment(id: string): Promise<CommentDB[]> {
    const result: CommentDB[] = await mongoose.model('Comments').find({ id });
    return result;
  }

  // Busca os detalhes de like/dislike
  public findLikeDislike = async (actionId: string, userId: string): Promise<LikesDislikesDB> => {
    const resultDB: LikesDislikesDB | null = await mongoose.model('LikesDislikes').findOne({
      action_id: actionId,
      user_id: userId,
    });
    return resultDB as LikesDislikesDB;
  };
}

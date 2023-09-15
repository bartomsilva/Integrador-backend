import { z } from "zod"
import { LIKED } from "../../models/Post"

export interface GetCommentInputDTO {
  postId: string,
  token: string 
}

export interface GetCommentOutputDTO {
  id: string,  
  content: string,
  postId: string,
  parentalPostId: string,
  likes: number,
  dislikes: number,  
  comments: number,
  creator: {
    id: string,
    name: string
  },
  liked: LIKED

}

export const GetCommentShema = z.object(
  {
    postId: z.string().min(1),
    token: z.string().min(1)
  }).transform(data => data as GetCommentInputDTO)


  
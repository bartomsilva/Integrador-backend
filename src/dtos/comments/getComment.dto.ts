import { z } from "zod"

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
  //createdAt: string,
  //updatedAt: string 
  creator: {
    id: string,
    name: string
  }
}

export const GetCommentShema = z.object(
  {
    postId: z.string().min(1),
    token: z.string().min(1)
  }).transform(data => data as GetCommentInputDTO)


  
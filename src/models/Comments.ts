import { PostDB, PostUpdateDB } from "./Post";

// INSERT COMMMENT
export interface CommentDB extends PostDB {
  post_id: string,
  parental_post_id: string
}

// UPDATE DO COMMENT
export interface CommentUpdateDB extends PostUpdateDB {} 



// COMMENTS
export interface CommentResultDB {
  id: string,  
  post_id: string,
  parental_post_id: string,
  content: string,
  likes: number,
  dislikes: number,  
  comments: number,
  creator_id: string,
  creator_name: string,
  created_at: string,
  updated_at: string, 
}

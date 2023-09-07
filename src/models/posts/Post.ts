// INSERT  DO POST
export interface PostDB {
  id: string,  
  creator_id: string,
  content: string,
  likes: number,
  dislikes: number,  
  created_at: string,
  updated_at: string 
}

// UPDATE DO POST
export interface PostUpdateDB {
  id: string
  content: string
  updated_at: string 
}

// POSTS  USERS
export interface PostResultDB {
  id: string,  
  content: string,
  likes: number,
  dislikes: number,  
  created_at: string,
  updated_at: string, 
  creator_id: string,
  creator_name: string
}

// INSERT E UPDATE - LIKES_DISLIKES
export interface LikesDislikesDB {
  post_id: string
  user_id: string
  like: number
}

import { BaseDataBase } from "../../src/database/BaseDataBase"
import { PostDB, PostResultDB, PostUpdateDB } from "../../src/models/Post"

export const postMock: PostResultDB[] = [
  {
    id: "id-mock-post1",  
    content: "mock-post-1",
    likes: 0,
    dislikes: 0,  
    comments: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(), 
    creator_id: "id-mock-bart",
    creator_name: "Bart"
  },
  {
    id: "id-mock-post2",  
    content: "mock-post-2",
    likes: 0,
    dislikes: 0,  
    comments: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(), 
    creator_id: "id-mock-bart",
    creator_name: "Bart"
  },
  {
    id: "id-mock-post3",  
    content: "mock-post-3",
    likes: 0,
    dislikes: 0,  
    comments: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(), 
    creator_id: "id-mock-fulano",
    creator_name: "Fulano"
  },
]

export class PostDataBaseMock extends BaseDataBase {

  TABLE_NAME = "posts"

  //=============== INSERT POST
  public insertPost = async (newPost: PostDB): Promise<void> => {}

  //=============== UPDATE POST 
  public updatePost = async (updatePost: PostUpdateDB, creatorId: string): Promise<void> => {}

  //=============== DELETE POST 
  public deletePost = async (postId: string): Promise<void> => {}

  //============ GET ALL POST
  public getPost = async ():Promise<PostResultDB[]> => {
      return postMock
  }
  //============= FIND POST
      public async findPost(id: string): Promise<PostDB[]> {
        const result: PostDB[] = postMock.filter( post => post.id == id)
        return result
    }
 

}

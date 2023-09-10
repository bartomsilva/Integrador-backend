import {LikeDislikeBusiness} from "../../../src/business/LikeDislikeBusiness"
import {LikesDislikesDataBaseMock} from "../../mocks/LikesDislikesDataBase.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { POST_ACTION } from "../../../src/models/Post"
import { NotFoundError } from "../../../src/error/NotFound"
import { BadRequestError } from "../../../src/error/BadRequest"

describe("Testando likedislike", () => {
  const likedislikeBusiness = new LikeDislikeBusiness(new LikesDislikesDataBaseMock(),
  new TokenManagerMock()  )

  test("resgistro que não existe, deve retornar = ok", async () => {
    expect.assertions(2);

    const input = {
      id: "id-mock-post2",
      like: true,
      action: POST_ACTION.POST,
      token: "id-mock-fulano"
    };
    // teste o like
    let result = await likedislikeBusiness.likeDislike(input);
    expect(result).toBe("ok")
    // teste o dislike
    input.like = false
    result = await likedislikeBusiness.likeDislike(input);
    expect(result).toBe("ok")    

  });
  
  test("registro que exite, deve retornar = ok", async () => {
    expect.assertions(2);
    
    const input = {
      id: "id-mock-post1",
      like: true,
      action: POST_ACTION.POST,
      token: "id-mock-fulano"
    };

    // teste o like
    let result = await likedislikeBusiness.likeDislike(input);
    expect(result).toBe("ok")
    // teste o dislike
    input.like=false
    result = await likedislikeBusiness.likeDislike(input);
    expect(result).toBe("ok")
  });

  test("registro que exite, deve retornar = ok", async () => {
    expect.assertions(2);
    
    const input = {
      id: "id-mock-post3",
      like: true,
      action: POST_ACTION.POST,
      token: "id-mock-bart"
    };

    // teste o like
    let result = await likedislikeBusiness.likeDislike(input);
    expect(result).toBe("ok")
    // teste o dislike
    input.like=false
    result = await likedislikeBusiness.likeDislike(input);
    expect(result).toBe("ok")
  });

  test("registro que exite comentario, deve retornar = ok", async () => {
    expect.assertions(1);
    
    const input = {
      id: "id-mock-comment-1",
      like: true,
      action: POST_ACTION.COMMENT,
      token: "id-mock-bart"
    };

    // teste o like
    const result = await likedislikeBusiness.likeDislike(input);
    expect(result).toBe("ok")   

  });
  
  test("deve retornar = token inválido", async () => {
    expect.assertions(1);
    try {
      const input = {
        id: "id-mock-post1",
        like: true,
        action: POST_ACTION.POST,
        token: "id-token-fail"
      };
  
      const result = await likedislikeBusiness.likeDislike(input);
      
    } catch (error) {
      if ( error instanceof  BadRequestError){
        expect(error.message).toEqual("token inválido")
      }      
    }
  });

  test("deve retornar = id não encontrado", async () => {
    expect.assertions(1);
    try {
      const input = {
        id: "id-mock-post",
        like: true,
        action: POST_ACTION.POST,
        token: "id-mock-fulano"
      };
  
      const result = await likedislikeBusiness.likeDislike(input);
      
    } catch (error) {
      if ( error instanceof  NotFoundError){
        expect(error.message).toEqual("'id' não encontrado")
      }      
    }
  });

  test("deve retornar = ação inválida", async () => {
    expect.assertions(1);
    try {
      const input = {
        id: "id-mock-post1",
        like: true,
        action: POST_ACTION.POST,
        token: "id-mock-bart"
      };
  
      const result = await likedislikeBusiness.likeDislike(input);
      
    } catch (error) {
      if ( error instanceof  BadRequestError){
        expect(error.message).toEqual("ação inválida")
      }      
    }
  });
    
}) 
import {PostBusiness} from "../../../src/business/PostBusiness"
import {PostDataBaseMock} from "../../mocks/PostDataBase.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { BadRequestError } from "../../../src/error/BadRequest"


describe("Testando createPost", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("Criando um post, deve retornar uma mensagem", async () => {
    expect.assertions(1);
    
    const input = {
      token: "id-mock-fulano",
      content: "vamos pra cima com tudo"
    };
    
    const result = await postBusiness.createPost(input);
    expect(result.content).toEqual("vamos pra cima com tudo");
  });

  test("Criando um post, deve retornar token invalido", async ()=>{
    expect.assertions(1)
    try {
      const input = {
        token: "token-fail",
        content: "vamos pra cima com tudo"
      }
      
      const result = await postBusiness.createPost(input)
        
    } catch (error) {
      if ( error instanceof BadRequestError){
          expect(error.message).toEqual("token inválido")        
      }
    }
  })
  
}) 
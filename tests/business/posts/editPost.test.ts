import {PostBusiness} from "../../../src/business/PostBusiness"
import {PostDataBaseMock} from "../../mocks/PostDataBase.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { BadRequestError } from "../../../src/error/BadRequest"


describe("Testando editPost", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )
  test("Editando um post, deve retornar ok", async ()=>{
    expect.assertions(1)
    try {
      const input = {
        token: "id-mock-fulano",
        content: "vamos pra cima com tudo"
      }
      
      const result = await postBusiness.editPost("oo",input)

      expect(result).toEqual("ok")
        
    } catch (error) {
      console.log(error)      
    }
  })

  test("Criando um post, deve retornar token invalido", async ()=>{
    expect.assertions(1)
    try {
      const input = {
        token: "token-fail",
        content: "vamos pra cima com tudo"
      }
      
      const result = await postBusiness.createPost(input)

      expect(result.content).toEqual("vanos pra cima com tudo")
        
    } catch (error) {
      if ( error instanceof BadRequestError){
          expect(error.message).toEqual("token inválido")        
      }
    }
  })
  
}) 
import { PostBusiness } from "../../../src/business/PostBusiness"
import { PostDataBaseMock } from "../../mocks/PostDataBase.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { BadRequestError } from "../../../src/error/BadRequest"
import { NotFoundError } from "../../../src/error/NotFound"
import { UnAuthorizedError } from "../../../src/error/UnAuthorized"


describe("Testando editPost", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("Edit post, deve retornar = ok", async () => {
    expect.assertions(1)
    const input = {
      token: "id-mock-bart",
      content: "vamos pra cima com tudo"
    }
    const result = await postBusiness.editPost("id-mock-post1", input)
    expect(result).toEqual("ok")
  })

  test("Edit post, deve retornar = token invalido", async () => {
    expect.assertions(1)
    try {
      const input = {
        token: "token-fail",
        content: "vamos pra cima com tudo"
      }
      const result = await postBusiness.editPost("id-mock-post1",input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("token inválido")
      }
    }
  })

  test("Edit post, deve retornar = recurso negado", async () => {
    expect.assertions(1)
    try {
      const input = {
        token: "id-mock-fulano",
        content: "vamos pra cima com tudo"
      }
      const result = await postBusiness.editPost("id-mock-post1",input)
    } catch (error) {
      if (error instanceof UnAuthorizedError) {
        expect(error.message).toEqual("recurso negado")
      }
    }
  })

  test("Edit post, deve retornar = 'id' não encontrado", async () => {
    expect.assertions(1)
    try {
      const input = {
        token: "id-mock-bart",
        content: "vamos pra cima com tudo"
      }
      const result = await postBusiness.editPost("id-mock-fail",input)
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toEqual("'id' não encontrado")
      }
    }
  })
}) 
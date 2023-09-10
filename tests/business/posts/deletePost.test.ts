import { PostBusiness } from "../../../src/business/PostBusiness"
import { PostDataBaseMock } from "../../mocks/PostDataBase.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { BadRequestError } from "../../../src/error/BadRequest"
import { NotFoundError } from "../../../src/error/NotFound"
import { UnAuthorizedError } from "../../../src/error/UnAuthorized"


describe("Testando deletePost", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("Delete post, deve retornar = token invalido", async () => {
    expect.assertions(1)
    try {
      const input = {
        token: "token-fail",
        id: "id-mock-post1"
      }
      const result = await postBusiness.deletePost(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("token inválido")
      }
    }
  })

  test("Delete post, deve retornar = recurso negado", async () => {
    expect.assertions(1)
    try {
      const input = {
        token: "id-mock-fulano",
        id: "id-mock-post1"
      }
      const result = await postBusiness.deletePost(input)

    } catch (error) {
      if (error instanceof UnAuthorizedError) {
        expect(error.message).toEqual("recurso negado")
      }
    }
  })

  test("Delete post, deve retornar = 'id' não encontrado", async () => {
    expect.assertions(1)
    try {
      const input = {
        token: "id-mock-bart",
        id: "id-fail"
      }
      const result = await postBusiness.deletePost(input)

    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toEqual("'id' não encontrado")
      }
    }
  })

  test("Delete post, deve retornar = ok", async () => {
    expect.assertions(1)
    const input = {
      token: "id-mock-bart",
      id: "id-mock-post1"
    }
    const result = await postBusiness.deletePost(input)
    expect(result).toEqual("ok")
  })

}) 
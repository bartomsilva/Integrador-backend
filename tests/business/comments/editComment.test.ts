import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { BadRequestError } from "../../../src/error/BadRequest"
import { NotFoundError } from "../../../src/error/NotFound"
import { UnAuthorizedError } from "../../../src/error/UnAuthorized"
import { CommentDataBaseMock } from "../../mocks/CommentDataBase.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"

describe("Testando editComment", () => {
  const commentBusiness = new CommentBusiness(
    new CommentDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve retornar = ok", async () => {
    expect.assertions(1)
    const commentId = "id-mock-comment-1"
    const input = {
      content: "ok",
      token: "id-mock-fulano"
    }
    const result = await commentBusiness.editComment(commentId, input)
    expect(result).toEqual("ok")
  })

  test("deve retornar = token inválido", async () => {
    expect.assertions(1);
    try {
      const commentId = "id-mock-comment-1"
      const input = {
        content: "ok",
        token: "token-fail"
      }
      const result = await commentBusiness.editComment(commentId, input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("token inválido")
      }
    }
  })

  test("deve retornar = recurso negado", async () => {
    expect.assertions(1);
    try {
      const commentId = "id-mock-comment-1"
      const input = {
        content: "ok",
        token: "id-mock-bart"
      }
      const result = await commentBusiness.editComment(commentId, input)
    } catch (error) {
      if (error instanceof UnAuthorizedError) {
        expect(error.message).toEqual("recurso negado")
      }
    }
  })

  test("deve retornar = 'id' não encontrado", async () => {
    expect.assertions(1)
    try {
      const commentId = "id-fail"
      const input = {
        content: "ok",
        token: "id-mock-fulano"
      }
      const result = await commentBusiness.editComment(commentId, input)
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toEqual("'id' não encontrado")
      }
    }
  })
})

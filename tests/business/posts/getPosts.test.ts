import { PostBusiness } from "../../../src/business/PostBusiness"
import { PostDataBaseMock } from "../../mocks/PostDataBase.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { BadRequestError } from "../../../src/error/BadRequest"
import exp from "constants"

describe("Testando getPost", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("get post, deve retornar = token invalido", async () => {
    expect.assertions(1)
    try {
      const input = {
        token: "token-fail",
      }
      const result = await postBusiness.getPost(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("token inválido")
      }
    }
  })

  test("get post, deve retornar = 3 objetos", async () => {
    expect.assertions(2)
    const input = {
      token: "id-mock-fulano"
    }
    const result = await postBusiness.getPost(input)
    expect(result).toHaveLength(3)
    expect(result).toContainEqual(
      {
        id: "id-mock-post2",
        content: "mock-post-2",
        likes: 0,
        dislikes: 0,
        comments: 0,
        updatedAt: expect.any(String),
        creator: { id: 'id-mock-bart', name: 'Bart' },
        liked: expect.any(String)
      })
  })
}) 
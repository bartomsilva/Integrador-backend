import { UserBusiness } from "../../src/business/UserBusiness"
import { GetUsersSchema } from "../../src/dtos/users/getUsers.dto"
import { USER_ROLES } from "../../src/models/User"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDataBaseMock } from "../mocks/UserDataBaseMock"
import { BadRequestError } from "../../src/error/BadRequest"

describe("Testando getUsers", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  )

  test("deve retornar uma lista de users", async () => {
    const input = GetUsersSchema.parse({
      token: "id-mock-bart"
    })

    const output = await userBusiness.getUsers(input)

    expect(output).toHaveLength(2)
    expect(output).toContainEqual({
      id: "id-mock-bart",
      name: "Bart",
      email: "bart@email.com",
      createdAt: expect.any(String),
      role: USER_ROLES.ADMIN
    })
  })

  test("deve retornar um usuário", async () => {
    const input = GetUsersSchema.parse({
      q: "Bart",
      token: "id-mock-bart"
    })

    const output = await userBusiness.getUsers(input)

    expect(output).toContainEqual({
      id: "id-mock-bart",
      name: "Bart",
      email: "bart@email.com",
      createdAt: expect.any(String),
      role: USER_ROLES.ADMIN
    })
  })
  
  test("deve retornar a mensagem somente admins podem acessar", async () => {
    try {
      const input = GetUsersSchema.parse({
        token: "id-mock-fulano"
      })

      const output = await userBusiness.getUsers(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("somente admins podem acessar esse recurso")
      }
    }
  })

  test("deve retornar a mensagem token inválido", async () => {
    try {
      const input = GetUsersSchema.parse({
        token: "token-falso"
      })

      const output = await userBusiness.getUsers(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("token inválido")
      }
    }
  })
})
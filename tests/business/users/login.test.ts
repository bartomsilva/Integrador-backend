import { UserBusiness } from "../../../src/business/UserBusiness"
import { LoginSchema } from "../../../src/dtos/users/login.dto"
import { BadRequestError } from "../../../src/error/BadRequest"
import { NotFoundError } from "../../../src/error/NotFound"
import { HashManagerMock } from "../../mocks/HashManager.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { UserDataBaseMock } from "../../mocks/UserDataBase.Mock"

describe("Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  )

  test("deve gerar um token ao logar", async () => {
    const input = LoginSchema.parse({
      email: "fulano@email.com",
      password: "Fulano123@"
    })
    const output = await userBusiness.login(input)
    expect(output).toEqual({
      user: {
        userId: "id-mock-fulano",
        userName: "Fulano"
      },
      token: "token-mock-fulano"
    })
  })

  test("deve gerar um token ao logar", async () => {
    const input = LoginSchema.parse({
      email: "bart@email.com",
      password: "Bart123@"
    })
    const output = await userBusiness.login(input)
    expect(output).toEqual({
      user: {
        userId: "id-mock-bart",
        userName: "Bart"
      },
      token: "token-mock-bart"
    })
  })

  test("deve retornar a mensagem email não encontrado ao tentar logar", async () => {
    expect.assertions(1)
    try {
      const input = {
        email: "ivanlid@email.com",
        password: "Fulano123@"
      }
      const output = await userBusiness.login(input)
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toEqual("'email' não encontrado")
      }
    }
  })

  test("deve retornar a mensagem 'password' incorreta ao tentar logar",
    async () => {
      expect.assertions(1)
      try {
        const input = {
          email: "fulano@email.com",
          password: "fulano12"
        }
        const output = await userBusiness.login(input)
      } catch (error) {
        if (error instanceof BadRequestError) {
          expect(error.message).toEqual("'password' incorreta")
        }
      }
    })
})
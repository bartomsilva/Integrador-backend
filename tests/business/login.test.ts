import { UserBusiness } from "../../src/business/UserBusiness"
import { LoginSchema } from "../../src/dtos/users/login.dto"
import { BadRequestError } from "../../src/error/BadRequest"
import { NotFoundError } from "../../src/error/NotFound"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDataBaseMock } from "../mocks/UserDataBaseMock"

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

  test("deve retornar a mensagem 'email' ou 'password' incorretos ao tentar logar",
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
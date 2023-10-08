import { UserBusiness } from "../../../src/business/UserBusiness"
import { ResetPasswordSchema } from "../../../src/dtos/users/resetPassword.dto"
import { BadRequestError } from "../../../src/error/BadRequest"
import { HashManagerMock } from "../../mocks/HashManager.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { UserDataBaseMock } from "../../mocks/UserDataBase.Mock"

describe("Testando reset password", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  )
 
  test("deve retornar mensagem ok", async () => {
      const input = ResetPasswordSchema.parse({email: "bart@email.com" })
      const output = await userBusiness.resetPassword(input)
      expect(output).toEqual("ok")     
  })
  test("deve retornar a mensagem email inválido", async () => {
    expect.assertions(1)
    try {
      const input = ResetPasswordSchema.parse({
        email: "em@falso.com"
      })
      const output = await userBusiness.resetPassword(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("'email' inválido")
      }
    }
  })
})
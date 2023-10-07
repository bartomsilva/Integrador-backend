import { UserBusiness } from "../../../src/business/UserBusiness"
import { LoginSchema } from "../../../src/dtos/users/login.dto"
import { ResetPasswordSchema } from "../../../src/dtos/users/resetPassword.dto"
import { BadRequestError } from "../../../src/error/BadRequest"
import { NotFoundError } from "../../../src/error/NotFound"
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

  test("deve retornar a mensagem token inválido", async () => {
    try {
      const input = ResetPasswordSchema.parse({
        token: "token-falso"
      })
      const output = await userBusiness.resetPassword(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("token inválido")
      }
    }
  })

  test("deve retornar a mensagem token inválido", async () => {
    try {
      const input = ResetPasswordSchema.parse({
        token: "token-falso"
      })
      const output = await userBusiness.resetPassword(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("token inválido")
      }
    }
  })

  test("deve retornar código ok", async () => {
      const input = ResetPasswordSchema.parse({token: "id-mock-bart" })
      const output = await userBusiness.resetPassword(input)
      expect(output).toEqual("ok")     
  })

})
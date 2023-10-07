import { UserBusiness } from "../../../src/business/UserBusiness"
import { CheckUserInputDTO } from "../../../src/dtos/users/checkUser.dto"
import { CreateAdminInputDTO } from "../../../src/dtos/users/createAdmin.dto"
import { BadRequestError } from "../../../src/error/BadRequest"
import { HashManagerMock } from "../../mocks/HashManager.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { UserDataBaseMock } from "../../mocks/UserDataBase.Mock"

describe("Testando checkLogin", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  )

  test("deve retornar um error", async () => {
    expect.assertions(1)
    try {
      const input: CheckUserInputDTO = {
        token: "token-mock-fail"
      }
      await userBusiness.checkLogin(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("token inválido")
      }
    }
  })

  test("deve retornar = objeto ", async () => {
    const input: CheckUserInputDTO = {
      token: "id-mock-fulano"
    }
    const result = await userBusiness.checkLogin(input)
    expect(result).toEqual({
      userId: "id-mock-fulano",
      userName: "Fulano"
    })
  })
})
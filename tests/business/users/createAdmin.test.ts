import { UserBusiness } from "../../../src/business/UserBusiness"
import { CreateAdminInputDTO } from "../../../src/dtos/users/createAdmin.dto"
import { BadRequestError } from "../../../src/error/BadRequest"
import { HashManagerMock } from "../../mocks/HashManager.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { UserDataBaseMock } from "../../mocks/UserDataBase.Mock"

describe("Testando Create Admin", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  )
  
  test("deve retornar a mensagem token inválido", async () => {
    expect.assertions(1)
    try {
      const input: CreateAdminInputDTO = {
        isAdmin: true,
        token: "token-falso"
      }
      const output = await userBusiness.createAdmin(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("token inválido")
      }
    }
  })  

  test("deve retornar = ok ", async () => {
      const input: CreateAdminInputDTO = {
        isAdmin: true,
        token: "id-mock-fulano"
      }
      const result = await userBusiness.createAdmin(input)
      expect(result).toBe("ok")
  })  


})
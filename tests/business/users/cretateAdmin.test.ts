import { UserBusiness } from "../../../src/business/UserBusiness"
import { CreateAdminInputDTO } from "../../../src/dtos/users/createAdmin.dto"
import { BadRequestError } from "../../../src/error/BadRequest"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDataBaseMock } from "../../mocks/UserDataBaseMock"

describe("Testando Create Admin", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  )

  
  test("deve retornar a mensagem token inválido", async () => {
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
})
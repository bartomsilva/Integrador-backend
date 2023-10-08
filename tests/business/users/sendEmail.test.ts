import { UserBusiness } from "../../../src/business/UserBusiness"
import { NotFoundError } from "../../../src/error/NotFound"
import { HashManagerMock } from "../../mocks/HashManager.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { UserDataBaseMock } from "../../mocks/UserDataBase.Mock"

describe("Testando send email", () => {
    const userBusiness = new UserBusiness(
        new UserDataBaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerMock()
    )


    test("deve retornar a mensagem Email não cadastrado", async () => {
        expect.assertions(1)
        try {
            const input = "em@falso.com"
            const output = await userBusiness.sendEmail(input)

        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toEqual("Email não cadastrado")
            }
        }
    })

    test("deve retornar a mensagem ok", async () => {
        const input = "bart@email.com"
        const output = await userBusiness.sendEmail(input)
        expect(output).toEqual("ok")
    })

})
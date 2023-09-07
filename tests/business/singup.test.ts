import { UserBusiness } from "../../src/business/users/UserBusiness"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDataBaseMock } from "../mocks/UserDataBaseMock"
import { SingUpInputDTO, SingUpSchema } from "../../src/dtos/users/singUp.dto"
import { ZodError } from "zod"
import { ConflictError } from "../../src/error/ConflictError"

describe("Teste da signup", () => {

  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  )

  test("deve retornar um token", async () => {
    const input: SingUpInputDTO = {

      name: "Linda Roberts",
      email: "linda@email.com",
      password: "Linda123@"
    }
    const output = await userBusiness.singUp(input)
    expect(output).toEqual({ token: "token-mock" })
  })

  test("o zod deve diaparar error em name", () => {
    expect.assertions(1)
    try {
      const input: SingUpInputDTO = {

        name: "L",
        email: "linda@email",
        password: "Linda123@"
      }

      SingUpSchema.parse(input)

    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe("'name' deve ter no mínimo 2 caracteres")
      }
    }
  })

  test("o zod deve diaparar error em email", () => {
    expect.assertions(1)
    try {
      const input: SingUpInputDTO = {

        name: "Linda Roberts",
        email: "linda@email",
        password: "Linda123@"
      }

      SingUpSchema.parse(input)

    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe("'email' invalido")
      }
    }
  })
  
  test("o zod deve diaparar error em password", () => {
    try {
      expect.assertions(1)
      const input: SingUpInputDTO = {

        name: "Linda Roberts",
        email: "linda@email.com",
        password: "Linda123"
      }

      SingUpSchema.parse(input)

    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe("'password' deve ter entre 6 e 15 caracteres, incluindo números, letras minusculas e no mínimo uma letra maiuscula, e um caracter especial")
      }
    }
  })

  test("deve retornar erro se o o email já estiver cadastrado", async () => {
    // expect.assertions(2)
    try {

      const input = SingUpSchema.parse({
        name: "Fulano",
        email: "fulano@email.com",
        password: "123456Aa@",  // Fulano123@
      })

      const output = await userBusiness.singUp(input)

    } catch (error) {
      if (error instanceof ConflictError) {
        expect(error.statusCode).toBe(409)
        expect(error.message).toBe("'email' já cadastrado")
      }
    }

  })

})
import { UserBusiness } from "../../../src/business/UserBusiness"
import { HashManagerMock } from "../../mocks/HashManager.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
import { UserDataBaseMock } from "../../mocks/UserDataBase.Mock"
import { CreateUserInputDTO, CreateUserSchema } from "../../../src/dtos/users/singUp.dto"
import { ZodError } from "zod"
import { ConflictError } from "../../../src/error/ConflictError"

describe("Teste da signup", () => {

  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  )

  test("deve retornar um token", async () => {
    const input: CreateUserInputDTO = {
      name: "Linda Roberts",
      email: "linda@email.com",
      password: "Linda123@"
    }
    const output = await userBusiness.createUser(input)
    expect(output).toEqual({ token: "token-mock" })
  })

  test("o zod deve diaparar error em name", () => {
    expect.assertions(1)
    try {
      const input: CreateUserInputDTO = {

        name: "L",
        email: "linda@email",
        password: "Linda123@"
      }

      CreateUserSchema.parse(input)

    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe("'name' deve ter no mínimo 2 caracteres")
      }
    }
  })

  test("o zod deve diaparar error em email", () => {
    expect.assertions(1)
    try {
      const input: CreateUserInputDTO = {

        name: "Linda Roberts",
        email: "linda@email",
        password: "Linda123@"
      }

      CreateUserSchema.parse(input)

    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe("'email' invalido")
      }
    }
  })
  
  test("o zod deve diaparar error em password", () => {
    expect.assertions(1)
    try {
      const input: CreateUserInputDTO = {

        name: "Linda Roberts",
        email: "linda@email.com",
        password: "Linda123"
      }

      CreateUserSchema.parse(input)

    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe("'password' deve ter entre 6 e 15 caracteres, incluindo números, letras minusculas e no mínimo uma letra maiuscula, e um caracter especial")
      }
    }
  })

  test("deve retornar erro se o o email já estiver cadastrado", async () => {
    expect.assertions(1)
    try {

      const input = CreateUserSchema.parse({
        name: "Fulano",
        email: "fulano@email.com",
        password: "123456Aa@",  // Fulano123@
      })

      const output = await userBusiness.createUser(input)

    } catch (error) {
      if (error instanceof ConflictError) {
        expect(error.message).toBe("'email' já cadastrado")
      }
    }
  })

})
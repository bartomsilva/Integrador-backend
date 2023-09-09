import { TokenPayload, USER_ROLES } from '../../src/models/User'

export class TokenManagerMock {
  // converte o objeto de dados (payload) para um token string
  public createToken = (payload: TokenPayload): string => {

    switch (payload.id) {
      default:
        return "token-mock"
      case "id-mock-fulano":
        return "token-mock-fulano"
      case "id-mock-bart":
         return "token-mock-bart"      
     }
  }
  // valida e converte o token string para um objeto de dados (payload)
  public getPayload = (token: string): TokenPayload | null => {
    switch (token) {
      case "id-mock-fulano":
        return {
          id: "id-mock-fulano",
          name: "Fulano",
          role: USER_ROLES.NORMAL
        }
      case "id-mock-bart":
         return {
          id: "id-mock-bart",
          name: "Bart",
          role: USER_ROLES.ADMIN
        } 
      default: 
        return null    
     }
  }
}
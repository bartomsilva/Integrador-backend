import z from 'zod'

export interface CheckUserInputDTO {
  token: string
}

export interface CheckUserOutputDTO 
{
  userId: string,
  userName: string
}

export const CheckUserSchema = z.object({
  token: z.string(
    {
      required_error: "'token' é obrigatório",
      invalid_type_error: "'token' deve ser do tipo string"
    })
}).transform(data => data as CheckUserInputDTO)
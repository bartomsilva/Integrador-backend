import z from 'zod'

export interface ResetPasswordInputDTO {
  email: string
}

export const ResetPasswordSchema = z.object({
  email: z.string(
    {
      required_error: "'email' é obrigatório",
      invalid_type_error: "'email' deve ser do tipo string"
    })
}).transform(data => data as ResetPasswordInputDTO)
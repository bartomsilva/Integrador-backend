import z from 'zod'

export interface CreateAdminInputDTO {
  isAdmin: boolean,
  token: string
}

export const CreateAdminSchema = z.object({
  isAdmin: z.boolean({
    required_error: "'isAdmin' é obrigatório",
    invalid_type_error: "'isAdmin' deve ser do tipo boolean"
  }),
  token: z.string({
    required_error: "'token' é obrigatório",
    invalid_type_error: "'token' deve ser do tipo string"
  }),
}).transform(data => data as CreateAdminInputDTO)
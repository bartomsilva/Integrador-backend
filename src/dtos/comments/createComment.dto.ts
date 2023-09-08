import z from "zod"

export interface CreateCommentInputDTO {
  postId: string,
  content: string
  token: string
}

export const CreateCommentSchema = z.object({
  postId: z.string(
    {
      required_error: "'id' é obrigatória",
      invalid_type_error: "'id' deve ser uma string"
    }
  ).min(1, "'id' inválido deve ter ao menos um caracter"),
  content: z.string(
    {
      required_error: "'content' é obrigatória",
      invalid_type_error: "'content' deve ser uma string"
    }
  ).min(1, "'content' inválido deve ter ao menos um caracter"),

  token: z.string() // adicionamos token também no schema
}).transform(data => data as CreateCommentInputDTO)

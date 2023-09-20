import z from "zod"
import { POST_ACTION } from "../../models/Post"

export interface LikeDislikeInputDTO {
  id: string
  like: boolean
  action: POST_ACTION
  token: string 
}

export const LikeDislikeSchema = z.object({
  id: z.string(
    {
      required_error: "'id' é obrigatório",
      invalid_type_error: "'id' deve ser uma string" 
    }
  ).refine((Id) => Id.length === 36,{message: "id inválido"} ),

  like: z.boolean(
    {
      required_error: "'like' é obrigatório",
      invalid_type_error: "'like' deve ser um boolean" 
    }),   

  action: z.enum([POST_ACTION.COMMENT, POST_ACTION.POST],{
    required_error: "'action' é obrigatório",
    invalid_type_error: "'aciton' deve ser "+POST_ACTION // precisa confirmar isso <<-
  }),

  token: z.string() 
}).transform(data => data as LikeDislikeInputDTO)
import z from "zod"

export interface LikeDislikeInputDTO {
  id: string
  like: boolean
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

  token: z.string() 
}).transform(data => data as LikeDislikeInputDTO)
import { PetTypeEnum } from '../types'
import z from 'zod'

export const AdoptionSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().optional(),
  contact: z.string(),
  type: PetTypeEnum
})
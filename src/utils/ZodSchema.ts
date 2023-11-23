import { PetTypeEnum } from '../types'
import z from 'zod'

export const FormTypeSchema = z.enum(['adoption', 'missing', 'wish'])

export const AdoptionSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  contact: z.string(),
  type: PetTypeEnum,
  petName: z.string(),
})

export const MissingFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  contact: z.string(),
  type: PetTypeEnum,
  petName: z.string(),
  lastSeen: z.string(),
  lat: z.number(),
  lng: z.number(),
})

export const emailSchema = z.string().email()
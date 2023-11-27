import { PetTypeEnum } from '../types'
import z from 'zod'

export const FormTypeSchema = z.enum(['adoption', 'missing', 'wish'])

export const AdoptionSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  contact: z.string().min(1),
  type: PetTypeEnum,
  petName: z.string().min(1),
})

export const MissingFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  contact: z.string().min(1),
  type: PetTypeEnum,
  petName: z.string().min(1),
  lastSeen: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
})

export const WishSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  contact: z.string().min(1),
  type: PetTypeEnum
})

export const emailSchema = z.string().email()
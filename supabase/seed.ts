import { AdoptionSchema, MissingFormSchema } from "@/utils/ZodSchema";
import supabase from "@/utils/supabase";
import z from 'zod'

type AdoptionFormData = z.infer<typeof AdoptionSchema> 
type MissingFormData = z.infer<typeof MissingFormSchema>
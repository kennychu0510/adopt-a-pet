import { z } from 'zod';
import { AdoptionSchema, MissingFormSchema } from './utils/ZodSchema';

export type AdoptionItem = z.infer<typeof AdoptionSchema>;
export type MissingItem = z.infer<typeof MissingFormSchema>;
export type WishItem = z.infer<typeof MissingFormSchema>;

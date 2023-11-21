import z from 'zod'

export const PetTypeEnum = z.enum(['dog', 'cat', 'parrot', 'rabbit', 'turtle'])

export type PetType = z.infer<typeof PetTypeEnum> | 'all'

export type PetCardProps = {
  id: number;
  name: PetType;
  image: string;
};

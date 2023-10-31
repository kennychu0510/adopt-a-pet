import z from 'zod'

export const PetTypeEnum = z.enum(['dog', 'cat', 'parrot', 'rabbit', 'turtle'])

type PetType = z.infer<typeof PetTypeEnum> | 'all'

export type PetCardProps = {
  name: PetType;
  image: string;
};

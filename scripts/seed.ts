import { AdoptionSchema, MissingFormSchema } from '@/utils/ZodSchema';
import supabase from '@/utils/supabase';
import z from 'zod';
import fs from 'fs';
import path from 'path';

function toBase64(filePath: string) {
  const img = fs.readFileSync(filePath);
  const prefix = `data:image/${path.extname(filePath)};base64,`;

  return prefix + Buffer.from(img).toString('base64');
}

const dog1Img = toBase64('./images/dog1.jpeg');
const dog4Img = toBase64('./images/dog4.jpeg');
const cat1Img = toBase64('./images/cat1.jpeg');

type AdoptionForm = z.infer<typeof AdoptionSchema>;
type MissingForm = z.infer<typeof MissingFormSchema>;
type WishForm = z.infer<typeof MissingFormSchema>;

const adoptionData: AdoptionForm[] = [
  {
    name: 'John',
    contact: 'john@gmail.com',
    petName: 'Ralph',
    description: 'My dog likes to play a lot!',
    image: dog1Img,
    type: 'dog',
  },
  {
    name: 'Andy',
    contact: '99998888',
    petName: 'Charlie',
    description: 'He likes to eat!',
    image: cat1Img,
    type: 'cat',
  },
];

const missingData: MissingForm[] = [
  {
    name: 'Jack',
    contact: 'jack@gmail.com',
    petName: 'Furry',
    image: dog4Img,
    description: 'He is white',
    lastSeen: String(new Date().getTime()),
    lat: 0,
    lng: 0,
    type: 'dog',
  },
];

async function main() {
  console.log('Seeding...');
  try {
    console.log('Seeding Done');
  } catch (error) {
    console.log('Seeding Failed', error);
  }
}

import { AdoptionItem, MissingItem } from '@/interface';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
function toBase64(filePath: string) {
  const img = fs.readFileSync(filePath);
  const prefix = `data:image/${path.extname(filePath)};base64,`;

  return prefix + Buffer.from(img).toString('base64');
}

function getRandomLatLngWithinHKBoundary(): { lat: number; lng: number } {
  const minLat = 22.15;
  const maxLat = 22.58;
  const minLng = 113.82;
  const maxLng = 114.41;

  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lng = Math.random() * (maxLng - minLng) + minLng;

  return { lat, lng };
}

function getRandomTimeWithinPastWeek(): string {
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const currentTime = Date.now();
  const pastWeek = currentTime - 7 * millisecondsInDay;
  const randomTime = Math.random() * (currentTime - pastWeek) + pastWeek;
  const randomDate = new Date(randomTime);
  return randomDate.toISOString();
}

const dog1Img = toBase64(__dirname + '/images/dog1.jpeg');
const dog4Img = toBase64(__dirname + '/images/dog4.jpeg');
const cat1Img = toBase64(__dirname + '/images/cat1.jpeg');
const parrot1Img = toBase64(__dirname + '/images/parrot1.jpeg');

const adoptionData: AdoptionItem[] = [
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

const missingData: MissingItem[] = [
  {
    name: 'Jack',
    contact: 'jack@gmail.com',
    petName: 'Furry',
    image: dog4Img,
    description: 'He is white',
    lastSeen: getRandomTimeWithinPastWeek(),
    lat: getRandomLatLngWithinHKBoundary().lat,
    lng: getRandomLatLngWithinHKBoundary().lng,
    type: 'dog',
  },
  {
    name: 'Samson',
    contact: 'samson@gmail.com',
    petName: 'Wing',
    image: parrot1Img,
    description: 'He likes to fly',
    lastSeen: getRandomTimeWithinPastWeek(),
    lat: getRandomLatLngWithinHKBoundary().lat,
    lng: getRandomLatLngWithinHKBoundary().lng,
    type: 'parrot',
  },
];

async function main() {
  console.log('Seeding...');
  const prisma = new PrismaClient();
  try {
    console.log('Cleaning database');
    await prisma.adoption.deleteMany();
    await prisma.missing.deleteMany();
    await prisma.contactUs.deleteMany();
    await prisma.wish.deleteMany();
    console.log('Inserting Seed');
    await prisma.adoption.createMany({ data: adoptionData });
    await prisma.missing.createMany({ data: missingData });
    console.log('Seeding Done');
  } catch (error) {
    console.log('Seeding Failed', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

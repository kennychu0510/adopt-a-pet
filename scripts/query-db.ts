import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adoption = await prisma.adoption.findMany();
  console.log(adoption);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

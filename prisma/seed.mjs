import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function main() {
  const statuses = ["pendiente", "confirmada", "cancelada", "completada"];
  
  for (const status of statuses) {
    // Crear estado solo si no existe
    const existingStatus = await prisma.reservationStatus.findUnique({
      where: { slug: status },
    });

    if (!existingStatus) {
      await prisma.reservationStatus.create({
        data: { name: status, slug: status.toLowerCase() }, // El slug lo puedes personalizar
      });
      console.log(`Estado "${status}" creado.`);
    } else {
      console.log(`El estado "${status}" ya existe.`);
    }
  }
}

main()
  .then(() => console.log('Seed complete'))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

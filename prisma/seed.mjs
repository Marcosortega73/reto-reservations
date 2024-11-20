import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const  transformSlug = (slug) => {
  return slug.toLowerCase().replace(/\s/g, "-");
}


async function main() {
  const statuses =[
    { label: "Pendiente", color: "warning" }, 
    { label: "Confirmada", color: "info" }, 
    { label: "Cancelada", color: "error" }, 
    { label: "Completada", color: "success" }, 
  ];

  for (const status of statuses) {
    const existingStatus = await prisma.reservationStatus.findUnique({
      where: { slug: transformSlug(status.label) },
    });

    if (!existingStatus) {
      await prisma.reservationStatus.create({
        data: {
          name: status.label,
          slug: transformSlug(status.label),
          color: status.color,
        }, 
      });
      console.log(`Estado "${status}" creado.`);
    } else {
      console.log(`El estado "${status}" ya existe.`);
    }
  }
}

main()
  .then(() => console.log("Seed complete"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

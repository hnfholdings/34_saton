import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rooms = [
    {
      slug: "garden-suite",
      name: "Garden Suite",
      description: "Private garden-facing suite for couples or executive travelers.",
      capacity: 2,
      rate: 165000,
      image: "Garden-facing luxury suite",
    },
    {
      slug: "saturn-family-room",
      name: "Saturn Family Room",
      description: "Spacious family accommodation with flexible sleeping arrangements.",
      capacity: 4,
      rate: 245000,
      image: "Family room with lounge area",
    },
    {
      slug: "event-house-exclusive",
      name: "Exclusive Venue Stay",
      description: "Whole-property stay package ideal for private functions and wedding parties.",
      capacity: 8,
      rate: 640000,
      image: "Exclusive use venue accommodation",
    },
  ];

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { slug: room.slug },
      create: room,
      update: room,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

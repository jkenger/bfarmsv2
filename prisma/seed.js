import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData = [
  {
    firstName: "Ken",
    lastName: "Gervacio",
    age: 22,
  },
  {
    firstName: "Ningning",
    lastName: "Picones",
    age: 21,
  },
  {
    firstName: "Carlo",
    lastName: "Dimapao",
    age: 23,
  },
];

const designations = [
  {
    name: "Senior Administrative Assistant I",
    salary: 26754.0,
  },
  {
    name: "Administrative Assistant VI",
    salary: 24495.0,
  },
  {
    name: "Aquaculturist I",
    salary: 22316.0,
  },
  {
    name: "Aquaculturist II",
    salary: 20000.0,
  },
  {
    name: "Administrative Assistant II (Store Keeper)",
    salary: 17505.0,
  },
];

const payrollGroups = [
  {
    name: "CARPS FINGERLING PRODUCTION AND HATCHERY DEVELOPMENT/ADMINISTRATION AND OPERATION OF NIFTC",
    fundCluster: "NIFEP/BASIL",
  },
  {
    name: "BALIK SIGLA SA ILOG AT LAWA",
    fundCluster: "NIFTC",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

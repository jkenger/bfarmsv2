import { PrismaClient } from "@prisma/client";

export default function newPrismaClient() {
  const prisma = new PrismaClient({
    log: ["query", "info", "warn"],
  }).$extends({
    model: {
      user: {
        async createUser(user) {
          await prisma.user.create({
            data: user,
          });
        },
      },
    },
  });
  return prisma;
}

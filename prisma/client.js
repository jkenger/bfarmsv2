import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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

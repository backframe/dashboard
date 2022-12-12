import { PrismaClient } from "database";

export const prisma = new PrismaClient();

export async function hasAdmin() {
  const admin = await prisma.user.findFirst({
    where: {
      role: "admin",
    },
  });
  return !!admin;
}

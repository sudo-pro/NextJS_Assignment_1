import { PrismaClient } from "../prisma/generated/prisma_client";

interface Global {
  prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as any as Global;

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

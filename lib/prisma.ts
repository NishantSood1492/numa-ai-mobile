import { PrismaClient } from "@/generated/prisma";

declare global {
  var db: PrismaClient | undefined;
}

const db = global.db || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.db = db;
}

export default db;

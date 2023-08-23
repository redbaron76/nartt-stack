import { appRouter } from "@/server/api/root";
// import { drizzle } from "@/server/db/drizzle";
import { prisma } from "@/server/db/prisma";

export const trpcServer = appRouter.createCaller({
  // db: drizzle,
  db: prisma,
});

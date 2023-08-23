import { appRouter } from "@/server/api/root";
import { drizzle } from "@/server/db";

export const trpcServer = appRouter.createCaller({
  db: drizzle,
});

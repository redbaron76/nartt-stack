import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { initTRPC } from "@trpc/server";

import { ZodError } from "zod";
import superjson from "superjson";

// import { drizzle } from "@/server/db/drizzle";
import { prisma } from "@/server/db/prisma";

type CreateContextOptions = Record<string, never>;

const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    // db: drizzle,
    db: prisma,
  };
};

export const createTRPCContext = (_opts: FetchCreateContextFnOptions) => {
  return createInnerTRPCContext({});
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

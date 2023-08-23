import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { todos } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const todoRouter = createTRPCRouter({
  getTodos: publicProcedure.query(({ ctx }) => {
    // return [10, 20, 30];
    return ctx.db.select().from(todos).all();
  }),
  addTodo: publicProcedure.input(z.string()).mutation(({ input, ctx }) => {
    ctx.db.insert(todos).values({ content: input, done: 0 }).run();
    return true;
  }),
  deleteTodo: publicProcedure.input(z.number()).mutation(({ input, ctx }) => {
    ctx.db.delete(todos).where(eq(todos.id, input)).run();
    return true;
  }),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      ctx.db
        .update(todos)
        .set({ done: input.done })
        .where(eq(todos.id, input.id))
        .run();
      return true;
    }),
});

import TodoList from "@/components/TodoList";
import { trpcServer } from "@/server/trpc";

export default async function Home() {
  const todos = await trpcServer.todo.getTodos();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TodoList initialTodos={todos} />
    </main>
  );
}

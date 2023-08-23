"use client";
import { trpc } from "@/client/trpc";
import { useState } from "react";
import { trpcServer } from "@/server/trpc";

type TodoListProps = {
  initialTodos: Awaited<ReturnType<(typeof trpcServer)["todo"]["getTodos"]>>;
};

export default function TodoList({ initialTodos }: TodoListProps) {
  const getTodos = trpc.todo.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const addTodo = trpc.todo.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const setDone = trpc.todo.setDone.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const deleteTodo = trpc.todo.deleteTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const [content, setContent] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {!getTodos.data?.length && <span>No todos</span>}
        {getTodos?.data?.map((todo) => (
          <div key={todo.id} className="flex gap-3 items-center">
            <input
              id={`check-${todo.id}`}
              type="checkbox"
              checked={!!todo.done}
              style={{ zoom: 1.5 }}
              onChange={() => {
                setDone.mutate({
                  id: todo.id,
                  done: todo.done ? 0 : 1,
                });
              }}
            />
            <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
            {todo.done === 1 && (
              <button
                className="border border-gray-300 rounded-md px-2 py-0.5 text-xs"
                onClick={() => {
                  deleteTodo.mutate(todo.id);
                }}
              >
                x
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4 items-center">
        <label htmlFor="content">Content</label>
        <input
          id="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
        <button
          className="border border-gray-300 rounded-md px-2 py-1"
          onClick={() => {
            if (content.length) {
              addTodo.mutate(content);
              setContent("");
            }
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}

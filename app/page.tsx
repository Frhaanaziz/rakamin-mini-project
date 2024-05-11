import TodoGroupSection from '@/components/todo-group-section';
import { getTodos } from './_actions/todo';
import { getTodoItems } from './_actions/item';

export default async function Home() {
  const { data: todos } = await getTodos(undefined);
  if (!todos) throw new Error('No todos found');

  const todosItems = await Promise.all(
    todos.map(async (todo) => {
      const { data: todoItems } = await getTodoItems({ todo_id: todo.id });
      if (!todoItems) throw new Error('No todo items found');

      return todoItems;
    })
  );

  const todosWithItems = todos.map((todo, i) => {
    return {
      ...todo,
      items: todosItems[i],
    };
  });

  return (
    <main className="container my-6">
      <TodoGroupSection todos={todosWithItems} />
    </main>
  );
}

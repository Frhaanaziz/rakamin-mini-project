import Todo from '@/components/todo';
import { getTodos } from './_actions/todo';

export default async function Home() {
  const { data: todos } = await getTodos(undefined);
  if (!todos) throw new Error('No todos found');

  return (
    <main className="container my-6">
      {/* <KanbanBoard /> */}
      <section className="grid grid-cols-4 gap-4">
        {todos.map((todo) => (
          <div key={todo.id}>
            <Todo todo={todo} />
          </div>
        ))}
      </section>
    </main>
  );
}

import CreateTodoDialog from '../dialogs/create-todo-dialog';

const Header = () => {
  return (
    <header className="flex gap-4 h-16 items-center px-6 border-b-2">
      <h1 className="text-lg xs:text-xl font-bold">Product Roadmap</h1>
      <CreateTodoDialog />
    </header>
  );
};

export default Header;

import CreateTodoDialog from '../dialogs/create-todo-dialog';

const Header = () => {
  return (
    <header className="border-b-2">
      <div className="container flex gap-4  h-16 items-center">
        <h1 className="text-lg xs:text-xl font-bold">Product Roadmap</h1>
        <CreateTodoDialog />
      </div>
    </header>
  );
};

export default Header;

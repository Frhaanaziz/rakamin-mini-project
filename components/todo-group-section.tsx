'use client';
import { todoColorList } from '@/lib/constants';
import { Item, Todo as TodoType, TodoWithItems } from '@/types';
import Todo from './todo';
import {
  DndContext,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  KeyboardSensor,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import TodoItem from './todo-item';
import { moveTodoItem as moveTodoItemAction } from '@/app/_actions/item';
import { useAction } from 'next-safe-action/hooks';
import {
  CustomMouseSensor,
  CustomTouchSensor,
  hasDraggableData,
} from '@/lib/dnd';
import { TodosContext } from '@/contexts/TodosContext';

type TodoGroupSectionProps = {
  todos: TodoWithItems[];
};

/**
 * Renders a section containing a group of todos.
 *
 * @component
 * @param {TodoGroupSectionProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const TodoGroupSection = ({ todos }: TodoGroupSectionProps) => {
  const [items, setItems] = useState<Item[]>(todos.flatMap((t) => t.items));
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [canShowDragOverlay, setCanShowDragOverlay] = useState<boolean>(false);

  const todoIds = todos.map((todo) => todo.id);

  const sensors = useSensors(
    useSensor(CustomMouseSensor),
    useSensor(CustomTouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { execute: moveTodoItem } = useAction(moveTodoItemAction);

  useEffect(() => {
    // Check if the document object is available.
    if ('document' in window) setCanShowDragOverlay(true);
  }, []);

  useEffect(() => {
    // Update the items state when the todos change.
    setItems(todos.flatMap((t) => t.items));
  }, [todos]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all">
      <TodosContext.Provider value={todos}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={() => setActiveItem(null)}
        >
          <SortableContext items={todoIds}>
            {todos.map((todo, i) => {
              const colorIndex = i % todoColorList.length;
              const color = todoColorList[colorIndex];

              return (
                <div key={todo.id}>
                  <Todo
                    todo={{
                      ...todo,
                      items: items.filter((item) => item.todo_id === todo.id),
                    }}
                    color={color}
                  />
                </div>
              );
            })}
          </SortableContext>

          {canShowDragOverlay &&
            createPortal(
              <DragOverlay>
                {activeItem && <TodoItem todoItem={activeItem} />}
              </DragOverlay>,
              document.body
            )}
        </DndContext>
      </TodosContext.Provider>
    </section>
  );

  /**
   * Handles the drag start event.
   * @param event The drag start event.
   */
  function onDragStart(event: DragStartEvent) {
    // Check if the active sensor has draggable data.
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;

    // Check if the draggable data is an item.
    if (data?.type === 'Item') {
      // Set the active item.
      setActiveItem(data.item);
      return;
    }
  }

  /**
   * Handles the drag over event for the todo group section.
   * @param event - The drag over event.
   */
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Check if the active and over ids are the same.
    if (activeId === overId) return;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveAItem = activeData?.type === 'Item';
    const isOverAItem = overData?.type === 'Item';

    // Check if the active data is an item.
    if (!isActiveAItem) return;

    if (isActiveAItem && isOverAItem) {
      const activeIndex = items.findIndex((t) => t.id === activeId);
      const overIndex = items.findIndex((t) => t.id === overId);
      const activeItem = items[activeIndex];
      const overItem = items[overIndex];

      // Check if the active and over items are different.
      if (activeItem && overItem && activeItem.todo_id !== overItem.todo_id) {
        // Move the item to the new todo.
        moveTodoItem({
          id: activeItem.id,
          todo_id: activeItem.todo_id,
          target_todo_id: overItem.todo_id as TodoType['id'],
        });

        // Update the items state.
        setItems((items) => {
          activeItem.todo_id = overItem.todo_id;
          return arrayMove(items, activeIndex, overIndex - 1);
        });
      }

      setItems((items) => arrayMove(items, activeIndex, overIndex));
    }

    const isOverATodo = overData?.type === 'Todo';

    // Check if the over data is a todo.
    if (isActiveAItem && isOverATodo) {
      const activeIndex = items.findIndex((t) => t.id === activeId);
      const activeItem = items[activeIndex];

      if (activeItem) {
        moveTodoItem({
          id: activeItem.id,
          todo_id: activeItem.todo_id,
          target_todo_id: overId as TodoType['id'],
        });

        setItems((items) => {
          activeItem.todo_id = overId as TodoType['id'];
          return arrayMove(items, activeIndex, activeIndex);
        });
      }

      setItems(items);
    }
  }
};

export default TodoGroupSection;

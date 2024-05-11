import { DraggableData } from '@/types';
import { Active, DataRef, MouseSensor, Over, TouchSensor } from '@dnd-kit/core';
import { MouseEvent, TouchEvent } from 'react';

/**
 * Event handler for drag and drop functionality.
 * Determines if the event target or any of its parent elements have the 'noDnd' dataset attribute.
 * @param event - The MouseEvent or TouchEvent object.
 * @returns Returns false if the event target or any of its parent elements have the 'noDnd' dataset attribute, otherwise returns true.
 */
const handler = ({ nativeEvent: event }: MouseEvent | TouchEvent) => {
  let cur = event.target as HTMLElement;

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement as HTMLElement;
  }

  return true;
};

/**
 * CustomMouseSensor class extends the MouseSensor class.
 * It provides a custom activator for the onMouseDown event.
 */
export class CustomMouseSensor extends MouseSensor {
  static activators = [
    { eventName: 'onMouseDown', handler },
  ] as (typeof MouseSensor)['activators'];
}

/**
 * Represents a custom touch sensor that extends the TouchSensor class.
 */
export class CustomTouchSensor extends TouchSensor {
  static activators = [
    { eventName: 'onTouchStart', handler },
  ] as (typeof TouchSensor)['activators'];
}

/**
 * Checks if the given entry has draggable data.
 * @param entry - The entry to check.
 * @returns True if the entry has draggable data, false otherwise.
 */
export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) return false;

  const data = entry.data.current;

  if (data?.type === 'Item') return true;

  return false;
}

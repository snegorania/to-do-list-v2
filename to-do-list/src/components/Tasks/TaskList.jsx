import { useState, useEffect } from "react";
import Task from "./Task/Task";
import styles from "./TaskList.module.css";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../utils/StrictModeDroppable";

const TaskList = ({ tasks, onDragEnd }) => {
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const tasks = [...taskList];
    const [reorderedItem] = tasks.splice(result.source.index, 1);
    tasks.splice(result.destination.index, 0, reorderedItem);
    onDragEnd(tasks);
    setTaskList(tasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${styles["task-list"]} ${
              tasks.length >= 7 && styles.scrollable
            }`}
          >
            {taskList.map((el, index) => (
              <Draggable key={String(el.id)} draggableId={String(el.id)} index={index}>
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <Task
                      id={el.id}
                      title={el.title}
                      isImportant={el.isImportant}
                      isMyDay={el.isMyDay}
                      isDone={el.isDone}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;

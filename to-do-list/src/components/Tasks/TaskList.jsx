import Task from "./Task/Task";
import styles from "./TaskList.module.css";

const TaskList = ({ tasks }) => {
  return (
    <>
      <ul className={styles["task-list"]}>
        {tasks.map((el) => (
          <li key={el.id}>
            <Task
              id={el.id}
              title={el.title}
              isImportant={el.isImportant}
              isMyDay={el.isMyDay}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;

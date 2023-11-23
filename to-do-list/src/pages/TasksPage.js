import React from "react";
import styles from "./TasksPage.module.css";
import { useSelector } from "react-redux";
import { selectSingleList } from "../store/singleListSlice";
import TaskList from "../components/Tasks/TaskList";
import { Outlet, useNavigate } from "react-router-dom";

const TasksPage = () => {
  const list = useSelector(selectSingleList);
  const navigate = useNavigate();
  return (
    <section className={styles.section}>
      {(list.isUsers || list.isTasks) && (
        <button className={styles["add-task"]} onClick={() => navigate('add-task')}>+ Add Task</button>
      )}
      <TaskList tasks={list.tasks} />
      <Outlet/>
    </section>
  );
};

export default TasksPage;
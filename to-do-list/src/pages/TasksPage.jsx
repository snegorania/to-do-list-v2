import React from "react";
import styles from "./TasksPage.module.css";
import { useSelector } from "react-redux";
import { selectSingleList } from "../store/singleListSlice";
import TaskList from "../components/Tasks/TaskList";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Paggination from "../components/UI/Paggination/Paggination";

const TasksPage = () => {
  const {t} = useTranslation();
  const list = useSelector(selectSingleList);
  const navigate = useNavigate();
  return (
    <section className={styles.section}>
      {(list.isUsers || list.isTasks) && (
        <button className={styles["add-task"]} onClick={() => navigate('add-task')}>+ {t("addTask")}</button>
      )}
      <TaskList tasks={list.tasks} />
      <Paggination currentPage={6} allPagesNum={10}/>
      <Outlet/>
    </section>
  );
};

export default TasksPage;

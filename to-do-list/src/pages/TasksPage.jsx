import React from "react";
import styles from "./TasksPage.module.css";
import { useSelector } from "react-redux";
import {
  selectTasks,
  selectPagination,
  selectSingleList,
} from "../store/singleListSlice";
import TaskList from "../components/Tasks/TaskList";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Pagination from "../components/UI/Pagination/Pagination";
import { pagination } from "../utils/pagination";

const TasksPage = () => {
  const { t } = useTranslation();
  const list = useSelector(selectSingleList);
  const tasks = useSelector(selectTasks);
  const paginationObj = useSelector(selectPagination);
  const navigate = useNavigate();
  return (
    <section className={styles.section}>
      {(list.isUsers || list.isTasks) && (
        <button
          className={styles["add-task"]}
          onClick={() => navigate("add-task")}
        >
          + {t("addTask")}
        </button>
      )}
      <TaskList
        tasks={pagination(
          tasks,
          paginationObj.rows,
          paginationObj.currentPage,
          paginationObj.extraRows
        )}
      />
      <Pagination
        currentPage={paginationObj.currentPage}
        allPagesNum={paginationObj.allPages}
        rows={paginationObj.rows}
      />
      <Outlet />
    </section>
  );
};

export default TasksPage;

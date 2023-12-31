import React, { useEffect, useState } from "react";
import styles from "./TasksPage.module.css";
import { useSelector } from "react-redux";
import { selectPagination, selectSingleList } from "../store/singleListSlice";
import TaskList from "../components/Tasks/TaskList";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Pagination from "../components/UI/Pagination/Pagination";
import { pagination } from "../utils/pagination";
import PaginationSettings from "../components/UI/PaginatonSettings/PaginationSettings";
import { getPaginationBorders } from "../utils/pagination";
import { addTaskOrder, addNewListToOrder, orderTasks } from "../utils/drag-n-drop";
import { useResize } from "../hooks/useResize";
import { selectSingleListLoading } from "../store/singleListSlice";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TasksPage = () => {
  const { t } = useTranslation();

  const list = useSelector(selectSingleList);
  const loading = useSelector(selectSingleListLoading);
  const paginationObj = useSelector(selectPagination);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const size = useResize(500);
  

  useEffect(() => {
    let arrayIdOrder = JSON.parse(localStorage.getItem("tasksOrder"));

    if (!arrayIdOrder) {
      arrayIdOrder = addTaskOrder(list.id, list.tasks);
      localStorage.setItem("tasksOrder", JSON.stringify(arrayIdOrder));
    }

    let myObj = arrayIdOrder.find((el) => el.list === list.id);

    if (arrayIdOrder.length && !myObj && list.tasks.length) {
      arrayIdOrder = addNewListToOrder(list.id, list.tasks, arrayIdOrder);
    }

    let orderedTasks = [];

    if (arrayIdOrder.length && list.tasks.length) {
      orderedTasks = orderTasks(list.id, arrayIdOrder, list.tasks);
    }

    setTasks(orderedTasks);
  }, [list]);

  const handleDragEnd = (order) => {
    const borders = getPaginationBorders(
      tasks,
      paginationObj.rows,
      paginationObj.currentPage,
      paginationObj.extraRows
    );

    let counter = 0;
    const tasksOrder = JSON.parse(localStorage.getItem("tasksOrder"));
    const listObjIndex = tasksOrder.findIndex((el) => el.list === list.id);
    const myObj = {...tasksOrder[listObjIndex]}
    const myArr = [...myObj.tasks];
    for (let i = borders.start; i < borders.end; i++) {
      myArr.splice(i, 1, order[counter].id);
      counter = counter + 1; 
    }
    const newTasksOrder = [...tasksOrder];
    newTasksOrder[listObjIndex] = {...myObj, tasks: myArr};
    localStorage.setItem("tasksOrder", JSON.stringify(newTasksOrder));
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        {(list.isUsers || list.isTasks) && (
          <button
            className={styles["add-task"]}
            onClick={() => navigate("add-task")}
          >
            + {t("addTask")}
          </button>
        )}
        {size.isScreenBp && <PaginationSettings
          currentPage={paginationObj.currentPage}
          allPagesNum={paginationObj.allPages}
          rows={paginationObj.rows}
        />}
      </div>
      {loading? <Skeleton width='99%' height={50} count={5}/> : <TaskList
        tasks={pagination(
          tasks,
          paginationObj.rows,
          paginationObj.currentPage,
          paginationObj.extraRows
        )}
        onDragEnd={handleDragEnd}
      />}
      {size.isScreenBp && <Pagination
        currentPage={paginationObj.currentPage}
        allPagesNum={paginationObj.allPages}
      />}
      {!size.isScreenBp && <PaginationSettings
          currentPage={paginationObj.currentPage}
          allPagesNum={paginationObj.allPages}
          rows={paginationObj.rows}/>
      }
      <Outlet />
    </section>
  );
};

export default TasksPage;

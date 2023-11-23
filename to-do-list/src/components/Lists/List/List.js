import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./List.module.css";
import { useSelector } from "react-redux";
import { selectListFromData } from "../../../store/dataSlice";
import { FaListCheck } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import TaskList from "../../Tasks/TaskList";
import { CSSTransition } from "react-transition-group";
import { IoTodayOutline } from "react-icons/io5";
import { MdTaskAlt } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { selectSingleList, setSingleList } from "../../../store/singleListSlice";
import { Outlet } from "react-router-dom";

const timeout = { enter: 400, exit: 200 };

const List = ({ id }) => {
  const dispatch = useDispatch();

  const dataList = useSelector((state) => selectListFromData(state, id));

  const listToSet = useMemo(() => dataList, [id]);

  dispatch(setSingleList(listToSet));

  const list = useSelector(selectSingleList);

  const [isOpen, setOpen] = useState(false);
  const descriptionRef = useRef();
  const arrowRef = useRef();

  return (
    <section className={styles.section}>
      <div className={styles["list-header"]}>
        <div className={styles["heading-wrapper"]}>
          {list.isTasks && <MdTaskAlt className={styles["list-icon"]} />}
          {list.isImportant && (
            <AiOutlineStar className={styles["list-icon"]} />
          )}
          {list.isMyDay && <IoTodayOutline className={styles["list-icon"]} />}
          {list.isUsers && <FaListCheck className={styles["list-icon"]} />}
          <h2 className={styles["list-title"]}>{list.title}</h2>
        </div>
        {list.isUsers && (
          <CSSTransition
            in={isOpen}
            nodeRef={arrowRef}
            timeout={timeout}
            classNames={{
              enterActive: `${styles["arrow-down"]}`,
              enterDone: `${styles["arrow-down"]}`,
              exitActive: `${styles["arrow-right"]}`,
              exitDone: `${styles["arrow-right"]}`,
            }}
          >
            <div ref={arrowRef}>
              <IoIosArrowForward
                alt="Arrow button to open deasription"
                className={styles.arrow}
                onClick={() => setOpen((prev) => !prev)}
              />
            </div>
          </CSSTransition>
        )}
      </div>
      {list.isUsers && (
        <>
          <hr className={styles.line} />
          <CSSTransition
            in={isOpen}
            nodeRef={descriptionRef}
            timeout={timeout}
            unmountOnExit
            mountOnEnter
            classNames={{
              enterActive: `${styles["list-description"]}`,
              enterDone: `${styles["list-description"]}`,
              exitActive: `${styles["list-no-description"]}`,
            }}
          >
            <p ref={descriptionRef}>{list.description}</p>
          </CSSTransition>
        </>
      )}
      <Outlet/>
    </section>
  );
};

export default List;

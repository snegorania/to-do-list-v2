import React, { useState, useRef, useEffect } from "react";
import styles from "./List.module.css";
import { useSelector } from "react-redux";
import { FaListCheck } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import { IoTodayOutline } from "react-icons/io5";
import { MdTaskAlt } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  selectSingleList,
  getList,
  selectSingleListLoading,
} from "../../../store/singleListSlice";
import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack } from "react-icons/io";
import { useResize } from "../../../hooks/useResize";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const timeout = { enter: 400, exit: 200 };

const List = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(id));
  }, [dispatch, id]);

  const list = useSelector(selectSingleList);
  const loading = useSelector(selectSingleListLoading);

  const [isOpen, setOpen] = useState(false);
  const descriptionRef = useRef();
  const arrowRef = useRef();

  const screen = useResize(900);

  const arrowLink = !screen.isScreenBp && (
    <Link to={'/lists'}><IoMdArrowBack className={styles.backIcon} /></Link>
  );

  return (
    <section className={styles.section}>
    {loading ? <Skeleton height={50} className={styles.skeleton}/> : <div className={styles["list-header"]}>
        <div className={styles["heading-wrapper"]}>
          {list.isTasks && (
            <>
              {arrowLink}
              <MdTaskAlt className={styles["list-icon"]} />
              <h2 className={styles["list-title"]}>{t("tasksList")}</h2>
            </>
          )}
          {list.isImportant && (
            <>
              {arrowLink}
              <AiOutlineStar className={styles["list-icon"]} />
              <h2 className={styles["list-title"]}>{t("important")}</h2>
            </>
          )}
          {list.isMyDay && (
            <>
              {arrowLink}
              <IoTodayOutline className={styles["list-icon"]} />
              <h2 className={styles["list-title"]}>{loading? <Skeleton/>: t("myDay")}</h2>
            </>
          )}
          {list.isUsers && (
            <>
              {arrowLink}
              <FaListCheck className={styles["list-icon"]} />
              <h2 className={styles["list-title"]}>{loading? <Skeleton/>: list.title}</h2>
            </>
          )}
        </div>
        {list.isUsers && list.description && (
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
      </div>}
      {list.isUsers && list.description && (
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
      <Outlet />
    </section>
  );
};

export default List;

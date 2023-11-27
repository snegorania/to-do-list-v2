//import of react, task list for this list, styles for component, image of arrow, and styles
import React from "react";
import styles from "./ListMenuItem.module.css";
import { FaListCheck } from "react-icons/fa6";
import { BsTrashFill } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoTodayOutline } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
import { MdTaskAlt } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDeleteId } from "../../../store/listsSlice";
import { useSelector } from "react-redux";
import { selectImportant } from "../../../store/listsSlice";
import { resetPagination } from "../../../store/singleListSlice";
import {useTranslation} from 'react-i18next';

// list function
function ListMenuItem({ id, title, isMyDay, isTasks, isImportant, isUsers }) {
  const {t} = useTranslation()
  const navigate = useNavigate();
  const idImportant = useSelector(selectImportant);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setDeleteId(id));
    navigate(`/lists/${idImportant}/tasks/delete-list`);
  };

  const handleNavigate = () => {
    dispatch(resetPagination());
    navigate(`${id}/tasks`)
  }

  return (
    <div className={styles.list}>
      <div onClick={handleNavigate} className={styles.heading}>
        {isTasks && (
          <>
            <MdTaskAlt className={styles.icon} />
            <h3 className={styles.title}>{t("tasksList")}</h3>
          </>
        )}
        {isImportant && (
          <>
            <AiOutlineStar className={styles.icon} />
            <h3 className={styles.title}>{t("important")}</h3>
          </>
        )}
        {isMyDay && (
          <>
            <IoTodayOutline className={styles.icon} />
            <h3 className={styles.title}>{t("myDay")}</h3>
          </>
        )}
        {isUsers && (
          <>
            <FaListCheck className={styles.icon} />
            <h3 className={styles.title}>{title}</h3>
          </>
        )}
      </div>
      {isUsers && (
        <div className={styles.controls}>
          <Link to={`/lists/${id}/tasks/edit-list`}>
            <AiTwotoneEdit className={styles.edit} />
          </Link>
          <BsTrashFill className={styles.delete} onClick={handleDelete} />
        </div>
      )}
    </div>
  );
}

export default ListMenuItem;

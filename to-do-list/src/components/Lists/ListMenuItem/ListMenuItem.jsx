//import of react, task list for this list, styles for component, image of arrow, and styles
import React, {useState} from "react";
import styles from "./ListMenuItem.module.css";
import { FaListCheck } from "react-icons/fa6";
import { BsTrashFill } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoTodayOutline } from 'react-icons/io5';
import { AiOutlineStar } from 'react-icons/ai';
import { MdTaskAlt } from 'react-icons/md';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setDeleteId } from "../../../store/listsSlice";
import { useSelector } from "react-redux";
import { selectImportant } from "../../../store/listsSlice";

// list function
function ListMenuItem({ id, title, isMyDay, isTasks, isImportant, isUsers }) {
  const navigate = useNavigate();
  const idImportant = useSelector(selectImportant);
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(setDeleteId(id));
    navigate(`/lists/${idImportant}/tasks/delete-list`);
  }

  return (
    <div className={styles.list}>
      <div onClick={() => navigate(`${id}/tasks`)} className={styles.heading}>
        {isTasks && <MdTaskAlt className={styles.icon}/>}
        {isImportant && <AiOutlineStar className={styles.icon} />}
        {isMyDay  && <IoTodayOutline className={styles.icon} />}
        {isUsers && <FaListCheck className={styles.icon} />}
        <h3 className={styles.title}>{title}</h3>
      </div>
      {isUsers && (
        <div className={styles.controls}>
          <Link to={`/lists/${id}/tasks/edit-list`}><AiTwotoneEdit className={styles.edit}/></Link>
          <BsTrashFill className={styles.delete} onClick={handleDelete}/>
        </div>
      )}
    </div>
  );
}

export default ListMenuItem;

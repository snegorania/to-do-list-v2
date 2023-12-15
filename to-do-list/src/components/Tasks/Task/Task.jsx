import React from "react";
import styles from "./Task.module.css";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import InvisiableButton from "../../UI/InvisiableButton/InvisiableButton";
import { IoToday } from "react-icons/io5";
import { IoTodayOutline } from "react-icons/io5";
import { useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { changeTaskStatus } from "../../../store/singleListSlice";

// function of task component
function Task({ title, id, isImportant, isMyDay, isDone }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleDoneChange = () => {
    dispatch(changeTaskStatus({id, isMyDay, isImportant, isDone: !isDone}))
  };

  const handleImportant = () => {
    dispatch(changeTaskStatus({id, isMyDay, isImportant: !isImportant, isDone}))
  };

  const handleMyDay = () => {
    dispatch(changeTaskStatus({id, isMyDay: !isMyDay, isImportant, isDone}))
  };

  return (
    <div className={styles.task}>
      <div className={styles.taskHeading}>
        <input
          type="checkbox"
          name="title"
          className={styles.input}
          id={id}
          onChange={handleDoneChange}
        />
        <label htmlFor={id} className={styles.checkbox}>
          {isDone && <IoCheckmark className={styles.checkMark} />}
        </label>
        <h3 className={`${styles.title} ${isDone && styles.titleChecked}`} onClick={() => navigate(`${id}`)}>
          {title}
        </h3>
      </div>
      <div className={styles.statuses}>
        <InvisiableButton className={styles.status} onClick={handleMyDay}>
          {isMyDay ? (
            <IoToday className={styles.icon} />
          ) : (
            <IoTodayOutline className={styles.icon} />
          )}
        </InvisiableButton>
        <InvisiableButton className={styles.status} onClick={handleImportant}>
          {isImportant ? (
            <MdOutlineStar className={styles.icon} />
          ) : (
            <MdStarBorder className={styles.icon} />
          )}
        </InvisiableButton>
      </div>
    </div>
  );
}

export default Task;

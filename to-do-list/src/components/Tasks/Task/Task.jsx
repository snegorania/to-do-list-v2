import React, { useState, useEffect } from "react";
import styles from "./Task.module.css";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import InvisiableButton from "../../UI/InvisiableButton/InvisiableButton";
import { IoToday } from "react-icons/io5";
import { IoTodayOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";

// function of task component
function Task({ title, id, isImportant, isMyDay }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isMarkedImportant, setIsMarkedImportant] = useState(isImportant);
  const [isMarkedMyDay, setIsMarkedMyDay] = useState(isMyDay);
  const navigate = useNavigate();

  const handleDoneChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleImportant = () => {
    setIsMarkedImportant((prev) => !prev);
  };

  const handleMyDay = () => {
    setIsMarkedMyDay((prev) => !prev);
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
          {isChecked && <IoCheckmark className={styles.checkMark} />}
        </label>
        <h3 className={`${styles.title} ${isChecked && styles.titleChecked}`} onClick={() => navigate(`${id}`)}>
          {title}
        </h3>
      </div>
      <div className={styles.statuses}>
        <InvisiableButton className={styles.status} onClick={handleMyDay}>
          {isMarkedMyDay ? (
            <IoToday className={styles.icon} />
          ) : (
            <IoTodayOutline className={styles.icon} />
          )}
        </InvisiableButton>
        <InvisiableButton className={styles.status} onClick={handleImportant}>
          {isMarkedImportant ? (
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

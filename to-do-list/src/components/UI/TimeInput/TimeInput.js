import React from "react";
import styles from "./TimeInput.module.css";

const TimeInput = (props) => {
  const { className, isNotValid, ...other } = props;
  return (
    <input
      type="time"
      className={`${styles["input-time"]} ${className} ${isNotValid && styles.error}`}
      {...other}
    />
  );
};

export default TimeInput;

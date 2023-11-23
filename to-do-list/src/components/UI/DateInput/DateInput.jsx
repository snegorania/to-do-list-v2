import React from "react";
import styles from "./DateInput.module.css";

const DateInput = (props) => {
  const { className, isNotValid, ...other } = props;
  return (
    <input
      type="date"
      className={`${styles["input-date"]} ${className} ${isNotValid && styles.error}`}
      {...other}
    />
  );
};

export default DateInput;

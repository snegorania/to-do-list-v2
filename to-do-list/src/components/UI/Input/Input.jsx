import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  const {className, isNotValid, ...other} = props;
  return (
    <input
      type="text"
      className={`${styles.input} ${className} ${isNotValid && styles.error}`}
      {...other}
    />
  );
};

export default Input;

import React from "react";
import styles from "./Textarea.module.css";

const Textarea = (props) => {
  const { className, isNotValid, ...other } = props;
  return <textarea className={`${styles.textarea} ${className} ${isNotValid && styles.error}`} {...other} />;
};

export default Textarea;

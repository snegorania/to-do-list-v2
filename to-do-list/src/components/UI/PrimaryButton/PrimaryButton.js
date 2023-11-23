import React from "react";
import styles from "./PrimaryButton.module.css";

const PrimaryButton = (props) => {
  const { children, className, ...other } = props;
  return (
    <button className={`${styles["primary-button"]} ${className}`} {...other}>
      {children}
    </button>
  );
};

export default PrimaryButton;

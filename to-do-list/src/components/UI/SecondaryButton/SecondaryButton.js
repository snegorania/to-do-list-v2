import React from "react";
import styles from "./SecondaryButton.module.css";

const SecondaryButton = (props) => {
  const { children, className, ...other } = props;
  return (
    <button className={`${styles["secondary-button"]} ${className}`} {...other}>
      {children}
    </button>
  );
};

export default SecondaryButton;
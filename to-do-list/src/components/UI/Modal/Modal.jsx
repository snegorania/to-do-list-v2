import React from "react";
import styles from "./Modal.module.css";
import { ImCross } from "react-icons/im";

const Backdrop = ({ children }) => {
  return <div className={styles.backdrop}>{children}</div>;
};

const Modal = ({ className, children, onClose, title }) => {
  return (
    <>
      <Backdrop>
        <div className={`${className} ${styles.modal}`}>
          <header className={styles["form-header"]}>
            <h2 className={styles["form-heading"]}>{title}</h2>
            <button className={styles["close-button"]} onClick={onClose}>
              <ImCross className={styles["close-icon"]} />
            </button>
          </header>
          {children}
        </div>
      </Backdrop>
    </>
  );
};

export default Modal;

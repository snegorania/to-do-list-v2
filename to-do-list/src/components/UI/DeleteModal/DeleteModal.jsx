import React from "react";
import Modal from "../Modal/Modal";
import styles from "./DeleteModal.module.css";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";

const DeleteModal = ({ mode, onDelete }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("..");
  };
  return (
    <Modal
      title="Confirm delete"
      onClose={handleClose}
      className={styles.window}
    >
      <div className={styles.wrapper}>
        <p className={styles.text}>Are you sure that you want to delete this {mode}?</p>
        <div className={styles.actions}>
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={onDelete}>Ok</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

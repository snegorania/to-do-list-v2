import React from "react";
import Modal from "../Modal/Modal";
import styles from "./DeleteModal.module.css";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import { useTranslation } from "react-i18next";

const DeleteModal = ({ mode, onDelete }) => {
  const {t} = useTranslation(); 
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
        <p className={styles.text}>{t("areYouSure", {mode: mode})}</p>
        <div className={styles.actions}>
          <SecondaryButton onClick={handleClose}>{t("cancel")}</SecondaryButton>
          <PrimaryButton onClick={onDelete}>{t("ok")}</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

import React, { useEffect } from "react";
import styles from './ListForm.module.css';
import Modal from "../../UI/Modal/Modal";
import Input from "../../UI/Input/Input";
import Textarea from "../../UI/Textarea/Textarea";
import useInput from "../../../hooks/useInput";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import { addList } from "../../../store/listsSlice";
import { addListToData, updateListToData } from "../../../store/dataSlice";
import { updateList } from "../../../store/listsSlice";
import { isNotEmpty, notRequired } from "../../../utils/validations";
import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton'
import SecondaryButton from "../../UI/SecondaryButton/SecondaryButton";
import { useTranslation } from "react-i18next";

function ListForm ({listForEdit, method}) {
  const {t} = useTranslation()

  const [title, titleFunc] = useInput(isNotEmpty);

  const [description, descriptionFunc] = useInput(notRequired);

  const formTitle = method === 'post' ? t("addListForm") : t("editListForm");

  useEffect(() => {
    if (listForEdit) {
      titleFunc.setValue(listForEdit.title || '');
      descriptionFunc.setValue(listForEdit.description || '');
    }
  }, [listForEdit]);

  const navigate = useNavigate();
  const id = useParams().listId;
  const dispatch = useDispatch();

  const handleClose = () => {
    navigate(`..`);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (title.isValid && description.isValid) {
      if (method === 'post') {
        const list = {
          id: nanoid(),
          title: title.value,
          description: description.value,
          isImportant: false,
          isMyDay: false,
          isTasks: false,
          isUsers: true
        }
  
        dispatch(addList(list));
        dispatch(addListToData(list));
      } else {
        dispatch(updateList({id: listForEdit.id, title: title.value, description: description.value}));
        dispatch(updateListToData({id: listForEdit.id, title: title.value, description: description.value}));
      }
    }

    titleFunc.reset();
    descriptionFunc.reset();
    navigate('..');
  }

  return (
    <Modal className={styles.window} onClose={handleClose} title={formTitle}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="list-title" className={styles.label}>{t("titleList")}</label>
        <Input
          id="list-title"
          name="title"
          className={styles.input}
          value={title.value}
          isNotValid={title.isNotValid}
          onChange={titleFunc.handleChange}
          onBlur={titleFunc.handleBlur}
        />
        <label htmlFor="list-deacription" className={styles.label}>{t("descriptionList")}</label>
        <Textarea
          id="list-deacription"
          name="description"
          className={styles.textarea}
          value={description.value}
          isNotValid={description.isNotValid}
          onChange={descriptionFunc.handleChange}
          onBlur={descriptionFunc.handleBlur}
        />
        <div className={styles.actions}>
          <SecondaryButton type="button" onClick={handleClose}>{t("cancel")}</SecondaryButton>
          <PrimaryButton>{t("save")}</PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

export default ListForm;

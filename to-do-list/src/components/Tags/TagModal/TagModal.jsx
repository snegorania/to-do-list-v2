import React, { useState } from "react";
import Modal from "../../UI/Modal/Modal";
import styles from "./TagModal.module.css";
import Input from "../../UI/Input/Input";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import TagWithLogic from "../TagWithLogic/TagWithLogic";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';
import { selectAllTags } from "../../../store/tagsSlice";
import { useDispatch } from "react-redux";
import { addTag, editTag, deleteTag } from "../../../store/tagsSlice";


const TagModal = ({ onClose }) => {
  const tags= useSelector(selectAllTags);
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tag.trim().length === 0) {
      return;
    }
    const index = tags.findIndex((el) => el.title === tag);
    if (index === -1) {
      dispatch(addTag({ id: nanoid(), title: tag.trim() }));
      setTag("");
    }
  };

  const handleTagChange = ({ target: { value } }) => {
    setTag(value);
  };

  const handleEdit = (id, title) => {
    dispatch(editTag({id, title}));
  };

  const handleDelete = (id) => {
    dispatch(deleteTag(id));
  };

  return (
    <Modal title="Tags" className={styles.window} onClose={onClose}>
      <div className={styles.addTagToTask}>
        <form className={styles.tagTaskForm} onSubmit={handleSubmit}>
          <Input
            className={styles.tagInput}
            placeholder="Enter tag"
            value={tag}
            name="tag"
            onChange={handleTagChange}
          />
          <PrimaryButton>Add</PrimaryButton>
        </form>
        <hr></hr>
        <ul className={styles.tagsToEnter}>
          {tags
            .filter((el) => el.title.includes(tag))
            .map((el) => (
              <TagWithLogic
                id={el.id}
                key={el.id}
                title={el.title}
                onEdit={handleEdit}
                onDelete={handleDelete.bind(null, el.id)}
              />
            ))}
        </ul>
      </div>
    </Modal>
  );
};

export default TagModal;

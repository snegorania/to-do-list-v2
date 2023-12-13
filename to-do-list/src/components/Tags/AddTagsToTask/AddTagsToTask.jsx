import React, { useState } from "react";
import ClosingTag from "../ClosingTag/ClosingTag";
import SimpleTag from "../SimpleTag/SimpleTag";
import Input from "../../UI/Input/Input";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import styles from "./AddTagsToTask.module.css";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectAllTags } from "../../../store/tagsSlice";
import { useDispatch } from "react-redux";
import { addTag } from "../../../store/tagsSlice";

const AddTagsToTask = ({ onAddTag, onDeleteTag, tags }) => {
  const allTags = useSelector(selectAllTags);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleAddToTask = (id) => {
    const tag = allTags.find((el) => el.id === id);
    onAddTag({...tag});
  };

  const handleTitle = ({ target: { value } }) => {
    setTitle(value.trim());
  };

  const handleAddNewTag = () => {
    if (title.trim().length === 0) return;
    const index = allTags.findIndex((tag) => tag.title === title);
    if (index !== -1) {
      handleAddToTask(allTags[index].id);
    } else {
      const id = nanoid();
      dispatch(addTag({ id, title }));
      onAddTag({ id, title });
    }

    setTitle("");
  };

  return (
    <div className={styles.addTagToTask}>
      <ul className={styles.tagsToEnter}>
        {tags.map((el) =>
            <ClosingTag
              title={el.title}
              key={el.id}
              onDelete={() => onDeleteTag(el.id)}
            />
          )}
      </ul>
      <hr></hr>
      <div className={styles.tagTaskForm}>
        <Input
          className={styles.tagInput}
          placeholder="Enter tag"
          name="tagTitle"
          value={title}
          onChange={handleTitle}
        />
        <PrimaryButton onClick={handleAddNewTag}>Add</PrimaryButton>
      </div>
      <ul className={styles.tagsToEnter}>
        {allTags
          .filter((el) => tags.findIndex((tag) => tag.id === el.id) === -1)
          .filter((el) => el.title.includes(title))
          .map((el) => (
            <SimpleTag
              title={el.title}
              key={el.id}
              onClick={() => handleAddToTask(el.id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default AddTagsToTask;

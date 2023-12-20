import React, { useState } from "react";
import ClosingTag from "../ClosingTag/ClosingTag";
import SimpleTag from "../SimpleTag/SimpleTag";
import Input from "../../UI/Input/Input";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import styles from "./AddTagsToTask.module.css";
import { useSelector } from "react-redux";
import { selectAllTags } from "../../../store/tagsSlice";
import { useDispatch } from "react-redux";
import { addTag } from "../../../store/tagsSlice";
import { useTranslation } from "react-i18next";

const AddTagsToTask = ({ onAddTag, onDeleteTag, tags }) => {
  const allTags = useSelector(selectAllTags);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const {t} = useTranslation();

  const handleAddToTask = (id) => {
    const tag = allTags.find((el) => el.id === id);
    onAddTag({...tag});
  };

  const handleTitle = ({ target: { value } }) => {
    setTitle(value.trim());
  };

  const handleAddNewTag = async() => {
    if (title.trim().length === 0) return;
    const index = allTags.findIndex((tag) => tag.title === title);
    if (index !== -1) {
      handleAddToTask(allTags[index].id);
    } else {
      const response = await fetch('http://localhost:8080/api/tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, userId: 1})
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const newTag = await response.json();
      dispatch(addTag({ id: newTag.id, title: newTag.title }));
      onAddTag({ id: newTag.id, title: newTag.title });
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
          placeholder={t("enterTag")}
          name="tagTitle"
          value={title}
          onChange={handleTitle}
        />
        <PrimaryButton onClick={handleAddNewTag} type='button'>{t("add")}</PrimaryButton>
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

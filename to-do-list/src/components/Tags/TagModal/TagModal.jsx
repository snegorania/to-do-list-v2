import React, { useState } from "react";
import Modal from "../../UI/Modal/Modal";
import styles from "./TagModal.module.css";
import Input from "../../UI/Input/Input";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import TagWithLogic from "../TagWithLogic/TagWithLogic";
import { nanoid } from "@reduxjs/toolkit";

const DUMMY_TAGS = [
  {
    id: "tag1",
    title: "reading",
  },
  {
    id: "tag2",
    title: "writing",
  },
  {
    id: "tag3",
    title: "coding",
  },
  {
    id: "tag4",
    title: "doc",
  },
];

const TagModal = ({ onClose }) => {
  const [tags, setTags] = useState(DUMMY_TAGS);
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tag.trim().length === 0) {
      return;
    } else {
      setTags((prev) => [...prev, { id: nanoid(), title: tag }]);
      setTag("");
    }
  };

  const handleTagChange = ({ target: { value } }) => {
    setTag(value);
  };

  const handleEdit = (id, title) => {
    setTags((prev) => {
      const newTags = [...prev];
      const index = newTags.findIndex((el) => el.id === id);
      newTags[index] = { ...prev[index], title: title };
      return newTags;
    });
  };

  const handleDelete = id => {
    setTags(prev => prev.filter(el => el.id !== id));
  }
 
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
          {tags.map((el) => (
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

import React, { useState } from "react";
import Modal from "../../UI/Modal/Modal";
import styles from "./TagModal.module.css";
import Input from "../../UI/Input/Input";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import TagWithLogic from "../TagWithLogic/TagWithLogic";
import { useSelector } from 'react-redux';
import { selectAllTags } from "../../../store/tagsSlice";
import { useDispatch } from "react-redux";
import { postTag, putTag, deleteTags  } from "../../../store/tagsSlice";


const TagModal = ({ onClose }) => {

  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const tags= useSelector(selectAllTags);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tag.trim().length === 0) {
      return;
    }
    const index = tags.findIndex((el) => el.title === tag);
    if (index === -1) {
      dispatch(postTag({ title: tag.trim(), userId: 1 }));
      setTag("");
    }
  };

  const handleTagChange = ({ target: { value } }) => {
    setTag(value);
  };

  const handleEdit = (id, title) => {
    dispatch(putTag({id, title, userId: 1}));
  };

  const handleDelete = (id) => {
    dispatch(deleteTags(id));
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

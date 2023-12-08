import React, { useState } from "react";
import styles from './TagWithLogic.module.css';
import { FaRegTrashAlt } from "react-icons/fa";

const TagWithLogic = ({id, title, onEdit, onDelete}) => {
  const [tagText, setTagText] = useState(title);
  const [isEdit, setisEdit] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setTagText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tagText.trim().length === 0) return;
    setisEdit(false);
    onEdit(id, tagText);
  };

  return (
    <li className={styles.tagV2}>
      {!isEdit && (
        <>
          <p className={styles.tagLabel} onClick={() => setisEdit(true)}>
            {tagText}
          </p>
          <FaRegTrashAlt className={styles.tagIcon} onClick={onDelete}/>
        </>
      )}
      {isEdit && (
        <div className={styles.tagEditForm}>
          <input
            value={tagText}
            onChange={handleChange}
            className={styles.editTagInput}
          />
          <button className={styles.editTagButton} onClick={handleSubmit}>
            ok
          </button>
        </div>
      )}
    </li>
  );
};

export default TagWithLogic;

import React from 'react';
import { RxCross2 } from "react-icons/rx";
import styles from './ClosingTag.module.css';

const ClosingTag = ({title, onDelete}) => {
    return <li className={styles.tagV2}>
    <p className={styles.tagLabel}>{title}</p>
    <RxCross2 className={styles.tagIcon} onClick={onDelete} />
  </li>
}

export default ClosingTag;
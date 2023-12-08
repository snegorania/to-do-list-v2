import React from 'react';
import styles from './SimpleTag.module.css';

const SimpleTag = ({onClick, title}) => {
    return <li className={styles.tagV1} onClick={onClick}>{title}</li>
}

export default SimpleTag;
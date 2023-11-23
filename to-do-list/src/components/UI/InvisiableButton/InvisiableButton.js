import React from 'react';
import styles from './InvisiableButton.module.css';

const InvisiableButton = (props) => {
    const {children, className, ...other} = props;
    return (
        <button {...other} className={`${styles.button} ${className}`}>{children}</button>
    )
}

export default InvisiableButton;
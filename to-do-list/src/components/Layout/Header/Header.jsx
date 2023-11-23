import React from "react";
import styles from "./Header.module.css";
import LanguageSelect from "../LanguageSelect/LanguageSelect";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>ToDoList</h1>
      <LanguageSelect/>
    </header>
  );
};

export default Header;

import React from "react";
import styles from "./Header.module.css";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import TagModalButton from "../TagModalButton/TagModalButton";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>ToDoList</h1>
      <div className={styles.controls}>
        <TagModalButton />
        <LanguageSelect />
      </div>
    </header>
  );
};

export default Header;

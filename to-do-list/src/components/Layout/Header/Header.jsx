import React from "react";
import styles from "./Header.module.css";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import TagModalButton from "../TagModalButton/TagModalButton";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const {t} = useTranslation();
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>ToDoList</h1>
      <div className={styles.controls}>
        <Link to='/lists/tag-filter' className={styles.link}>{t("tagFilter")}</Link>
        <TagModalButton />
        <LanguageSelect />
      </div>
    </header>
  );
};

export default Header;

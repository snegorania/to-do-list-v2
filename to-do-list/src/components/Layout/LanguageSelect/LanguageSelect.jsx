import React from "react";
import ru from "../../../app/assets/ru.jpg";
import en from "../../../app/assets/en.png";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelect.module.css";

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      name="language"
      defaultValue={i18n.language}
      onChange={handleLanguageChange}
      className={styles.select}
    >
      <option
        value="en"
      >en</option>
      <option
        value="ru"
      >ru</option>
    </select>
  );
};

export default LanguageSelect;

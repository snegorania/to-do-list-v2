import React, { useState } from "react";
import ru from "../../../app/assets/ru.jpg";
import en from "../../../app/assets/en.png";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelect.module.css";
import Select from "react-select";
import { components } from "react-select";
const { SingleValue, Option } = components;

const IconSingleValue = (props) => {
  const {t} = useTranslation();
  return (
    <SingleValue {...props}>
      <img
        src={props.data.image}
        className={styles.image}
      />
      {t(props.data.label)}
    </SingleValue>
  );
};

const IconOption = (props) => {
  const {t} = useTranslation();
  return (
    <Option {...props}>
      <img
        src={props.data.image}
        className={styles.image}
      />
      {t(props.data.label)}
    </Option>
  );
};

const customStyles = {
  option: (provided) => ({
    ...provided,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
};

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(null);

  const handleLanguageChange = (option) => {
    setLang(option);
    i18n.changeLanguage(option.value);
  };

  const options = [
    {
      value: "en",
      label: "eng",
      image: en,
    },
    {
      value: "ru",
      label: "rus",
      image: ru,
    },
  ];

  return (
    <Select
      styles={customStyles}
      className={styles.select}
      components={{ SingleValue: IconSingleValue, Option: IconOption }}
      options={options}
      value={lang}
      onChange={handleLanguageChange}
      placeholder={t("language")}
    />
  );
};

export default LanguageSelect;

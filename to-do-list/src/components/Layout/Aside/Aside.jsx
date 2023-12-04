import React from "react";

import styles from "./Aside.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Aside = ({ children }) => {
  const {t} = useTranslation();
  return (
    <aside className={styles.aside}>
      <div className={styles.asideHeight}>{children}</div>
      <Link to={`tasks/add-list`} className={styles["add-button"]}>+ {t("addList")}</Link>
    </aside>
  );
};

export default Aside;

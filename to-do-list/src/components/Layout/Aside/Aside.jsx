import React from "react";

import styles from "./Aside.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Aside = ({ children }) => {
  const {t} = useTranslation();
  const params = useParams();
  return (
    <aside className={styles.aside}>
      {children}
      <Link to={`${params.listId}/tasks/add-list`} className={styles["add-button"]}>+ {t("addList")}</Link>
    </aside>
  );
};

export default Aside;

import React from "react";

import styles from "./Aside.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Aside = ({ children }) => {
  const params = useParams();
  return (
    <aside className={styles.aside}>
      {children}
      <Link to={`${params.listId}/tasks/add-list`} className={styles["add-button"]}>+ Add List</Link>
    </aside>
  );
};

export default Aside;

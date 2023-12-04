import React from "react";
import ListOfLists from "../components/Lists/ListOfLists";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from './AllListsPage.module.css';
import {Outlet} from 'react-router-dom';

const AllListsPage = () => {
    const {t} = useTranslation();
    return (
        <section className={styles.section}>
            <h2 className={styles.header}>{t("allLists")}</h2>
            <ListOfLists/>
            <Link to={`add-list`} className={styles["add-button"]}>+ {t("addList")}</Link>
            <Outlet/>
        </section>
    )
}

export default AllListsPage;
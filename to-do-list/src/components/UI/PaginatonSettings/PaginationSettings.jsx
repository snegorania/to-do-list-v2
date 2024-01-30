import React from "react";
import Select from "react-select";
import styles from "./PaginationSettings.module.css";
import { formPageOptions } from "../../../utils/pagination";
import {
  setPaginationPage,
  openAll,
  addExtraRows,
} from "../../../store/singleListSlice";
import { useDispatch } from "react-redux";
import {useTranslation} from "react-i18next";
import { useResize } from "../../../hooks/useResize";

const PaginationSettings = ({ currentPage, allPagesNum, rows }) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const pageOptions = formPageOptions(allPagesNum);
  const size = useResize(500);

  const handlePageChange = (value) => {
    dispatch(setPaginationPage(value));
  };

  const handleOpenAll = () => {
    dispatch(openAll());
  };

  const handleOpenMore = () => {
    dispatch(addExtraRows());
  };

  return (
    <div className={styles.paginationSettings}>
      <button className={styles.paginationButton} onClick={handleOpenMore}>
        {t('openMore', {rows: 5})}
      </button>
      <button className={styles.paginationButton} onClick={handleOpenAll}>
        {t('openAll')}
      </button>
      { size.isScreenBp && <div className={styles.selectInput}>
        <label>{t('page')}</label>
        <Select
          options={pageOptions}
          placeholder={currentPage}
          onChange={({ value }) => handlePageChange(Number(value))}
          menuPlacement="auto"
        />
      </div>}
    </div>
  );
};

export default PaginationSettings;

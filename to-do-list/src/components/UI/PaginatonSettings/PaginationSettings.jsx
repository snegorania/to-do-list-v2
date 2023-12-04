import React from "react";
import Select from "react-select";
import styles from "./PaginationSettings.module.css";
import { formPageOptions } from "../../../utils/pagination";
import {
  setPaginationPage,
  setPaginationRows,
  openAll,
  addExtraRows,
} from "../../../store/singleListSlice";
import { useDispatch } from "react-redux";
import {useTranslation} from "react-i18next";

const PaginationSettings = ({ currentPage, allPagesNum, rows }) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const pageOptions = formPageOptions(allPagesNum);
  const rowsOptions = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "15", label: "15" },
  ];

  const handlePageChange = (value) => {
    dispatch(setPaginationPage(value));
  };

  const handleRowsChange = ({ value }) => {
    dispatch(setPaginationRows(Number(value)));
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
        {t('openMore', {rows: rows})}
      </button>
      <button className={styles.paginationButton} onClick={handleOpenAll}>
        {t('openAll')}
      </button>
      <div className={styles.selectInput}>
        <label>{t('rows')}</label>
        <Select
          options={rowsOptions}
          placeholder={rows}
          onChange={handleRowsChange}
          menuPlacement="auto"
        />
      </div>
      <div className={styles.selectInput}>
        <label>{t('page')}</label>
        <Select
          options={pageOptions}
          placeholder={currentPage}
          onChange={({ value }) => handlePageChange(Number(value))}
          menuPlacement="auto"
        />
      </div>
    </div>
  );
};

export default PaginationSettings;

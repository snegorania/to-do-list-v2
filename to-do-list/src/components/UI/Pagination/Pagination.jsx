import React, { useState } from "react";
import Select from "react-select";
import styles from "./Pagination.module.css";
import { formPagControlArr, formPageOptions } from "../../../utils/pagination";
import { useDispatch } from "react-redux";
import {
  setPaginationPage,
  setPaginationRows,
  openAll,
  addExtraRows
} from "../../../store/singleListSlice";

const PagElement = ({ num, onClick, isCurrent }) => {
  return (
    <div className={`${styles.pagElement} ${isCurrent && styles.current}`} onClick={onClick}>
      {num}
    </div>
  );
};

const PagDots = () => {
  return <div className={styles.pagDots}>...</div>;
};

const Pagination = ({ currentPage, allPagesNum, rows }) => {
  const dispatch = useDispatch();
  const controls = formPagControlArr(currentPage, allPagesNum);
  const pageOptions = formPageOptions(allPagesNum);
  const rowsOptions = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "15", label: "15" },
  ];

  const handlePageChange = (value) => {
    dispatch(setPaginationPage(value));
  };

  const handleRowsChange = ({value}) => {
    dispatch(setPaginationRows(Number(value)));
  };

  const handleOpenAll = () => {
    dispatch(openAll());
  }

  const handleOpenMore = () => {
    dispatch(addExtraRows());
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={() => handlePageChange(-1)}
      >
        Prev
      </button>
      {controls.map((el, index) =>
        el ? (
          <PagElement
            num={el}
            key={index}
            isCurrent={currentPage === el}
            onClick={() => handlePageChange(el)}
          />
        ) : (
          <PagDots key={index} />
        )
      )}
      <button
        className={styles.paginationButton}
        onClick={() => handlePageChange(0)}
      >
        Next
      </button>
      <button className={styles.paginationButton} onClick={handleOpenMore}>Open {rows} next</button>
      <button className={styles.paginationButton} onClick={handleOpenAll}>Open all</button>
      <div className={styles.selectInput}>
        <label>Rows:</label>
        <Select
          options={rowsOptions}
          placeholder={rows}
          onChange={handleRowsChange}
          menuPlacement="auto"
        />
      </div>
      <div className={styles.selectInput}>
        <label>Page:</label>
        <Select
          options={pageOptions}
          placeholder={currentPage}
          onChange={({value}) => handlePageChange(Number(value))}
          menuPlacement="auto"
        />
      </div>
    </div>
  );
};

export default Pagination;

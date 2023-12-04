import React from "react";
import styles from "./Pagination.module.css";
import { formPagControlArr } from "../../../utils/pagination";
import { useDispatch } from "react-redux";
import {
  setPaginationPage,
} from "../../../store/singleListSlice";
import {useTranslation} from "react-i18next";

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

const Pagination = ({ currentPage, allPagesNum}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const controls = formPagControlArr(currentPage, allPagesNum);

  const handlePageChange = (value) => {
    dispatch(setPaginationPage(value));
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={() => handlePageChange(-1)}
      >
        {t('prev')}
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
        {t('next')}
      </button>
    </div>
  );
};

export default Pagination;

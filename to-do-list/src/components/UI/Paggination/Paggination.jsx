import React, { useState } from "react";
import Select from 'react-select';
import styles from "./Paggination.module.css";
import { formPagControlArr, formPageOptions } from "../../../utils/pagination";

const PagElement = ({ num }) => {
  return <div className={styles.pagElement}>{num}</div>;
};

const PagDots = () => {
  return <div className={styles.pagDots}>...</div>;
};

const Paggination = ({ currentPage, allPagesNum }) => {
  const controls = formPagControlArr(currentPage, allPagesNum);
  const pageOptions = formPageOptions(allPagesNum);
  const rowsOptions = [
    {value: '5', label: '5'},
    {value: '10', label: '10'},
    {value: '15', label: '15'},
  ]

  return (
    <div className={styles.paggination}>
      <button>Prev</button>
      {controls.map((el) => (el ? <PagElement num={el} /> : <PagDots />))}
      <button>Next</button>
      <button>Open n next</button>
      <button>Open all</button>
      <label>Rows</label>
      <Select/>
      <label>Page</label>
      <Select options={pageOptions}/>
    </div>
  );
};

export default Paggination;

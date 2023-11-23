import React from "react";
import styles from "./RootLayout.module.css";
import Header from "../../components/Layout/Header/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet/>
      </main>
    </>
  );
};

export default RootLayout;

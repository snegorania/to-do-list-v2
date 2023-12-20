import React, { useEffect } from "react";
import styles from "./RootLayout.module.css";
import Header from "../../components/Layout/Header/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTags } from "../../store/tagsSlice";

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;

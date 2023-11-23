import React from "react";
import Aside from "../../components/Layout/Aside/Aside";
import ListOfLists from "../../components/Lists/ListOfLists";
import { Outlet } from "react-router-dom";

const ListsLayout = () => {
  return (
    <>
      <Aside>
        <ListOfLists />
      </Aside>
      <Outlet />
    </>
  );
};

export default ListsLayout;

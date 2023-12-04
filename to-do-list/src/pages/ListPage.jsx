import React from "react";
import { useParams } from "react-router-dom";
import List from "../components/Lists/List/List";
import Aside from "../components/Layout/Aside/Aside";
import ListOfLists from "../components/Lists/ListOfLists";
import { useResize } from "../hooks/useResize";

const ListPage = () => {
  const params = useParams();
  const id = params.listId;
  const screen = useResize(900);
  return (
    <>
      {screen.isScreenBp && (
        <Aside>
          <ListOfLists />
        </Aside>
      )}
      <List id={id} />
    </>
  );
};

export default ListPage;

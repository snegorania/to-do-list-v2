import React from "react";
import { useParams } from "react-router-dom";
import List from "../components/Lists/List/List";

const ListPage = () => {
  const params = useParams();
  const id = params.listId;
  return (
    <>
      <List id={id} />
    </>
  );
};

export default ListPage;

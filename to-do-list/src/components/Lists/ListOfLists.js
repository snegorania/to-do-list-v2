// import react, useSelector hook and list component
import React, {useMemo, useEffect} from "react";
import ListMenuItem from "./ListMenuItem/ListMenuItem";
import styles from "./ListOfLists.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectListsFromData } from "../../store/dataSlice";
import { selectAllLists, setLists } from "../../store/listsSlice";


const ListOfLists = () => {
  
  const dispatch = useDispatch();

  const dataLists = useSelector(selectListsFromData);

  const listsToSet = useMemo(() => dataLists, [dataLists]);

  dispatch(setLists(listsToSet));

  const lists = useSelector(selectAllLists);

  return (
    <>
      <ul className={styles.lists}>
        {lists.filter((el) => !el.isUsers).map((el) => (
          <li key={el.id}>
            <ListMenuItem
              id={el.id}
              title={el.title}
              isUsers={el.isUsers}
              isImportant={el.isImportant}
              isMyDay={el.isMyDay}
              isTasks={el.isTasks}
            />
          </li>
        ))}
        {lists.filter((el) => el.isUsers).map((el) => (
          <li key={el.id}>
            <ListMenuItem id={el.id} title={el.title} isUsers={el.isUsers} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListOfLists;

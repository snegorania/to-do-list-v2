// import react, useSelector hook and list component
import React, { useEffect} from "react";
import ListMenuItem from "./ListMenuItem/ListMenuItem";
import styles from "./ListOfLists.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectAllLists, selectListsLoading } from "../../store/listsSlice";
import { getLists } from "../../store/listsSlice";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const ListOfLists = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  const lists = useSelector(selectAllLists);
  const loading = useSelector(selectListsLoading);

  return (
    <>
      <ul className={styles.lists}>
        {loading ? <Skeleton count={3} width='100%' height={45}/> : lists.filter((el) => !el.isUsers).map((el) => (
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
        {loading ? <Skeleton count={3} width='100%' height={45}/> : lists.filter((el) => el.isUsers).map((el) => (
          <li key={el.id}>
            <ListMenuItem id={el.id} title={el.title} isUsers={el.isUsers} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListOfLists;

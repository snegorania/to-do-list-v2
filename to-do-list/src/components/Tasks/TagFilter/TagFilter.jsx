import React, { useState } from "react";
import { useResize } from "../../../hooks/useResize";
import Aside from "../../Layout/Aside/Aside";
import ListOfLists from "../../Lists/ListOfLists";
import { useSelector } from "react-redux";
import Input from "../../UI/Input/Input";
import { selectAllTags } from "../../../store/tagsSlice";
import styles from "./TagFilter.module.css";
import ClosingTag from "../../Tags/ClosingTag/ClosingTag";
import SimpleTag from "../../Tags/SimpleTag/SimpleTag";
import Task from "../../Tasks/Task/Task";

const TagFilter = () => {
  const screen = useResize(900);
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const allTags = useSelector(selectAllTags);
  const [title, setTitle] = useState("");

  const fetchTasks = async (text) => {
    const response = await fetch(
      `http://localhost:8080/api/task/filtered?filters=${text}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data;
  };

  const handleAddToTask = async (id) => {
    const tag = allTags.find((el) => el.id === id);
    const newTags = [...tags, {...tag}];
    const filtersString = newTags.map(el => el.id).join();
    try {
      const data = await fetchTasks(filtersString);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
    setTags(newTags);
  };

  const handleDelete = async (id) => {
    const newTags = tags.filter(el => el.id !== id);
    const filtersString = newTags.map(el => el.id).join();
    console.log(newTags);
    try {
      const data = await fetchTasks(filtersString);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
    setTags(newTags);
  };

  const handleTitle = ({ target: { value } }) => {
    setTitle(value.trim());
  };

  return (
    <>
      {screen.isScreenBp && (
        <Aside>
          <ListOfLists />
        </Aside>
      )}

      <section className={styles.section}>
        <ul className={styles.tagsToEnter}>
          {tags.map((el) => (
            <ClosingTag
              title={el.title}
              key={el.id}
              onDelete={() => handleDelete(el.id)}
            />
          ))}
        </ul>
        <hr></hr>
        <div className={styles.tagTaskForm}>
          <Input
            className={styles.tagInput}
            placeholder="Search"
            name="tagSearch"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <ul className={styles.tagsToEnter}>
          {allTags
            .filter((el) => tags.findIndex((tag) => tag.id === el.id) === -1)
            .filter((el) => el.title.includes(title))
            .map((el) => (
              <SimpleTag
                title={el.title}
                key={el.id}
                onClick={() => handleAddToTask(el.id)}
              />
            ))}
        </ul>
        <ul className={styles.tasks}>
          {tasks.map((el) => (
            <li key={el.id}>
              <Task
                title={el.title}
                isDone={el.isDone}
                isMyDay={el.isMyDay}
                isImportant={el.isImportant}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default TagFilter;

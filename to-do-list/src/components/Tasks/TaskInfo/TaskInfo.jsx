import React from "react";
import SecondaryButton from "../../UI/SecondaryButton/SecondaryButton";
import styles from "./TaskInfo.module.css";
import Modal from "../../UI/Modal/Modal";
import { useSelector } from "react-redux";
import { selectTaskById } from "../../../store/singleListSlice";
import { useNavigate } from "react-router-dom";
import { setDeleteTaskId } from "../../../store/singleListSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const TaskInfo = ({ id }) => {
  const task = useSelector((state) => selectTaskById(state, id));
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => { navigate('..') };

  const handleDelete = () => {
    dispatch(setDeleteTaskId(id));
    navigate(`/lists/${params.listId}/tasks/delete-task`);
  }

  return (
    <Modal
      title={task.title}
      onClose={handleClose}
      className={styles.window}
    >
      <div className={styles.wrapper}>
        <div className={styles.startInfo}>
          <div>
            <h3 className={styles.label}>Title</h3>
            <p className={styles.title}>{task.title}</p>
          </div>
          <div>
            <h3 className={styles.label}>Deadline</h3>
            <p className={styles.deadline}>
              {task.deadline
                ? `${new Date(task.deadline).getFullYear()}-${
                    new Date(task.deadline).getMonth() + 1
                  }-${new Date(task.deadline).getDate()}`
                : "Not Entered"}
            </p>
          </div>
        </div>
        <h3 className={styles.label}>Description</h3>
        <p className={styles.description}>{task.description}</p>
        <div>
          <h3 className={styles.label}>Start Doing</h3>
          <div className={styles["date-time"]}>
            <div>
              <h4 className={styles.subDate}>Date</h4>
              <p className={styles.dateInfo}>
                {task.startTime
                  ? new Date(task.startTime).toLocaleDateString()
                  : "Not Entered"}
              </p>
            </div>
            <div>
              <h4 className={styles.subDate}>Time</h4>
              <p className={styles.dateInfo}>
                {task.startTime
                  ? new Date(task.startTime).toLocaleTimeString('en', {hour: 'numeric', hour12: false, minute: 'numeric'})
                  : "Not Entered"}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className={styles.label}>End Doing</h3>
          <div className={styles["date-time"]}>
            <div>
              <h4 className={styles.subDate}>Date</h4>
              <p className={styles.dateInfo}>
                {task.endTime
                  ? new Date(task.endTime).toLocaleDateString()
                  : "Not Entered"}
              </p>
            </div>
            <div>
              <h4 className={styles.subDate}>Time</h4>
              <p className={styles.dateInfo}>
                {task.endTime
                  ? new Date(task.endTime).toLocaleTimeString('en', {hour: 'numeric', hour12: false, minute: 'numeric'})
                  : "Not Entered"}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <SecondaryButton type="button">Edit</SecondaryButton>
          <SecondaryButton type="button" onClick={handleDelete}>Delete</SecondaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default TaskInfo;

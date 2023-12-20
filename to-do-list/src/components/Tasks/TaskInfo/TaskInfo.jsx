import React from "react";
import SecondaryButton from "../../UI/SecondaryButton/SecondaryButton";
import styles from "./TaskInfo.module.css";
import Modal from "../../UI/Modal/Modal";
import { useSelector } from "react-redux";
import { selectTaskById } from "../../../store/singleListSlice";
import { useNavigate } from "react-router-dom";
import { setChosenTaskId } from "../../../store/singleListSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SimpleTag from "../../Tags/SimpleTag/SimpleTag";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TaskInfo = ({ id, isFilter }) => {
  const { t } = useTranslation();
  const task = useSelector((state) => selectTaskById(state, id));
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    navigate("..");
  };

  const handleDelete = () => {
    dispatch(setChosenTaskId(id));
    if (isFilter) {
      navigate(`/lists/tag-filter/delete-task`);
    } else {
      navigate(`/lists/${params.listId}/tasks/delete-task`);
    }
  };

  const handleEdit = () => {
    dispatch(setChosenTaskId(id));
    if (isFilter) {
      navigate(`/lists/tag-filter/edit-task`);
    } else {
      navigate(`/lists/${params.listId}/tasks/edit-task`);
    }
  };

  return (
    <Modal
      title={task ? task.title : ""}
      onClose={handleClose}
      className={styles.window}
    >
      <div className={styles.wrapper}>
        <div className={styles.startInfo}>
          <div>
            <h3 className={styles.label}>{t("titleTask")}</h3>
            <p className={styles.title}>{task ? task.title : <Skeleton />}</p>
          </div>
          <div>
            <h3 className={styles.label}>{t("deadline")}</h3>
            <p className={styles.deadline}>
              {task ? (
                task.deadline ? (
                  new Date(task.deadline).toLocaleDateString()
                ) : (
                  "Not Entered"
                )
              ) : (
                <Skeleton />
              )}
            </p>
          </div>
        </div>
        <h3 className={styles.label}>{t("descriptionTask")}</h3>
        <p className={styles.description}>
          {task ? (
            task.description ? (
              task.description
            ) : (
              "Not Entered"
            )
          ) : (
            <Skeleton />
          )}
        </p>
        <div>
          <h3 className={styles.label}>{t("startDoing")}</h3>
          <div className={styles["date-time"]}>
            <div>
              <h4 className={styles.subDate}>{t("date")}</h4>
              <p className={styles.dateInfo}>
                {task ? (
                  task.startTime ? (
                    new Date(task.startTime).toLocaleDateString()
                  ) : (
                    "Not Entered"
                  )
                ) : (
                  <Skeleton />
                )}
              </p>
            </div>
            <div>
              <h4 className={styles.subDate}>{t("time")}</h4>
              <p className={styles.dateInfo}>
                {task ? (
                  task.startTime ? (
                    new Date(task.startTime).toLocaleTimeString("en", {
                      hour: "numeric",
                      hour12: false,
                      minute: "numeric",
                    })
                  ) : (
                    "Not Entered"
                  )
                ) : (
                  <Skeleton />
                )}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className={styles.label}>{t("endDoing")}</h3>
          <div className={styles["date-time"]}>
            <div>
              <h4 className={styles.subDate}>{t("date")}</h4>
              <p className={styles.dateInfo}>
                {task ? (
                  task.endTime ? (
                    new Date(task.endTime).toLocaleDateString()
                  ) : (
                    "Not Entered"
                  )
                ) : (
                  <Skeleton />
                )}
              </p>
            </div>
            <div>
              <h4 className={styles.subDate}>{t("time")}</h4>
              <p className={styles.dateInfo}>
                {task ? (
                  task.endTime ? (
                    new Date(task.endTime).toLocaleTimeString("en", {
                      hour: "numeric",
                      hour12: false,
                      minute: "numeric",
                    })
                  ) : (
                    "Not Entered"
                  )
                ) : (
                  <Skeleton />
                )}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className={styles.label}>{t("tags")}</h3>
          {task && (
            <ul className={styles.tagsToEnter}>
              {task.tags.map((el) => (
                <SimpleTag title={el.title} key={el.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <SecondaryButton type="button" onClick={handleEdit}>
          {t("edit")}
        </SecondaryButton>
        <SecondaryButton type="button" onClick={handleDelete}>
          {t("delete")}
        </SecondaryButton>
      </div>
    </Modal>
  );
};

export default TaskInfo;

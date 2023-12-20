import { useEffect, useState } from "react";
import styles from "./TaskForm.module.css";
import Modal from "../../UI/Modal/Modal";
import Input from "../../UI/Input/Input";
import DateInput from "../../UI/DateInput/DateInput";
import TimeInput from "../../UI/TimeInput/TimeInput";
import Textarea from "../../UI/Textarea/Textarea";
import useInput from "../../../hooks/useInput";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../UI/SecondaryButton/SecondaryButton";
import { isNotEmpty, notRequired } from "../../../utils/validations";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useGetTimePeriod from "../../../hooks/useGetTimePeriod";
import { useTranslation } from "react-i18next";
import AddTagsToTask from "../../Tags/AddTagsToTask/AddTagsToTask";
import { postTask, putTask } from "../../../store/singleListSlice";
import { useDispatch } from "react-redux";

function TaskForm({ method, defaultValue }) {
  const { t } = useTranslation();
  const listId = useParams().listId;
  const navigate = useNavigate();
  const [title, titleFunc] = useInput(isNotEmpty);
  const [description, descriptionFunc] = useInput(notRequired);
  const [deadline, deadlineFunc] = useInput(notRequired);
  const period = useGetTimePeriod(false);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  const { setValue: setTitle } = titleFunc;
  const { setValue: setDeadline } = deadlineFunc;
  const { setValue: setDescription } = descriptionFunc;
  const { set: setStartDate } = period.start.date;
  const { set: setStartTime } = period.start.time;
  const { set: setEndDate } = period.end.date;
  const { set: setEndTime } = period.end.time;

  useEffect(() => {
    if (defaultValue) {
      setTitle(defaultValue.title || "");
      setDescription(defaultValue.description || "");
      if (defaultValue.deadline) {
        setDeadline(
          new Date(defaultValue.deadline).toISOString().split("T")[0]
        );
      } else {
        setDeadline("");
      }

      if (defaultValue.startTime && defaultValue.endTime) {
        const startDate = new Date(defaultValue.startTime);
        const endDate = new Date(defaultValue.endTime);
        setStartDate(startDate.toISOString().split("T")[0] || "");
        setStartTime(
          startDate.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") ||
            ""
        );
        setEndDate(endDate.toISOString().split("T")[0] || "");
        setEndTime(
          endDate.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") || ""
        );
      } else {
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");
      }

      setTags(defaultValue.tags || []);
    }
  }, [
    defaultValue,
    setTitle,
    setDeadline,
    setDescription,
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      period.isValid &&
      title.isValid &&
      description.isValid &&
      deadline.isValid
    ) {
      let task;
      if (method === "post") {
        task = {
          title: title.value.trim(),
          description: description.value.trim() || null,
          listId: listId,
          userId: 1,
          deadline: deadline.value.trim() || null,
          startTime: period.start.get(),
          endTime: period.end.get(),
          isDone: false,
          isImportant: false,
          isMyDay: false,
          tags: tags.map((el) => el.id),
        };
        dispatch(postTask(task));
      } else {
        task = {
          id: defaultValue.id,
          title: title.value.trim(),
          description: description.value.trim() || null,
          listId: defaultValue.listId,
          userId: 1,
          deadline: deadline.value.trim() || null,
          startTime: period.start.get(),
          endTime: period.end.get(),
          isDone: defaultValue.isDone,
          isImportant: defaultValue.isImportant,
          isMyDay: defaultValue.isMyDay,
          tags: tags.map((el) => el.id),
        };
        dispatch(putTask(task));
      }
      period.reset();
      titleFunc.reset();
      deadlineFunc.reset();
      descriptionFunc.reset();
      setTags([]);
      navigate(`..`);
    } else {
      period.blurAll();
      titleFunc.handleBlur();
    }
  };

  const handleClose = () => {
    navigate('..');
  };

  const handleAddTag = (tag) => {
    setTags((prev) => [...prev, { ...tag }]);
  };

  const handleDeleteTag = (id) => {
    setTags((prev) => prev.filter((el) => el.id !== id));
  };

  const formTitle = method === 'post' ? t('addTask') : t('editTask');

  return (
    <Modal className={styles.window} title={formTitle} onClose={handleClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.wrapper}>
          <div className={styles["form-start"]}>
            <div>
              <label htmlFor="task-title" className={styles.label}>
                {t("titleTask")}
              </label>
              <Input
                id="task-title"
                name="title"
                value={title.value}
                isNotValid={title.isNotValid}
                onChange={titleFunc.handleChange}
                onBlur={titleFunc.handleBlur}
              />
            </div>
            <div>
              <label htmlFor="task-deadline" className={styles.label}>
                {t("deadline")}
              </label>
              <DateInput
                id="task-deadline"
                name="deadline"
                value={deadline.value}
                isNotValid={deadline.isNotValid}
                onChange={deadlineFunc.handleChange}
                onBlur={deadlineFunc.handleBlur}
              />
            </div>
          </div>
          {title.isNotValid && (
            <p className={styles.error}>Title id required</p>
          )}
          <label htmlFor="task-deacription" className={styles.label}>
            {t("descriptionTask")}
          </label>
          <Textarea
            id="task-deacription"
            name="description"
            className={styles.textarea}
            value={description.value}
            isNotValid={description.isNotValid}
            onChange={descriptionFunc.handleChange}
            onBlur={descriptionFunc.handleBlur}
          />
          <label className={styles.label}>
            {t("startDoing")}
            <span className={styles["date-time"]}>
              <DateInput
                name="startDate"
                className={styles["date-input"]}
                value={period.start.date.value}
                isNotValid={period.start.date.isNotValid}
                onChange={period.start.date.handleChange}
                onBlur={period.start.date.handleBlur}
              />
              <TimeInput
                name="startTime"
                className={styles["date-input"]}
                value={period.start.time.value}
                isNotValid={period.start.time.isNotValid}
                onChange={period.start.time.handleChange}
                onBlur={period.start.time.handleBlur}
              />
            </span>
          </label>
          <label className={styles.label}>
            {t("endDoing")}
            <span className={styles["date-time"]}>
              <DateInput
                name="endDate"
                className={styles["date-input"]}
                value={period.end.date.value}
                isNotValid={period.end.date.isNotValid}
                onChange={period.end.date.handleChange}
                onBlur={period.end.date.handleBlur}
              />
              <TimeInput
                name="endTime"
                className={styles["date-input"]}
                value={period.end.time.value}
                isNotValid={period.end.time.isNotValid}
                onChange={period.end.time.handleChange}
                onBlur={period.end.time.handleBlur}
              />
            </span>
          </label>
          {!period.isValid && period.message && (
            <p className={styles.error}>{period.message}</p>
          )}
          <AddTagsToTask
            tags={tags}
            onAddTag={handleAddTag}
            onDeleteTag={handleDeleteTag}
          />
        </div>
        <div className={styles.actions}>
          <SecondaryButton onClick={handleClose} type="button">
            {t("cancel")}
          </SecondaryButton>
          <PrimaryButton>{t("save")}</PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

export default TaskForm;

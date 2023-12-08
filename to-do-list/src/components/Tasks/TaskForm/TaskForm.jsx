import { useEffect } from "react";
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

function TaskForm({ method, defultValue }) {
  const { t } = useTranslation();
  const listId = useParams().listId;
  const navigate = useNavigate();
  const [title, titleFunc] = useInput(isNotEmpty);
  const [descriprion, descriptionFunc] = useInput(notRequired);
  const [deadline, deadlineFunc] = useInput(notRequired);
  const period = useGetTimePeriod(false);

  useEffect(() => {
    if (defultValue) {
      titleFunc.setValue(defultValue.title || "");
      descriptionFunc.setValue(defultValue.description || "");
      deadlineFunc.setValue(defultValue.deadline || "");
    }
  }, [defultValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (period.isValid) {
      console.log(period.start.get());
      console.log(period.end.get());
    }
  };

  const handleClose = () => {
    navigate(`/lists/${listId}/tasks`);
  };
  return (
    <Modal className={styles.window} title={"Task Form"} onClose={handleClose}>
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
          <label htmlFor="task-deacription" className={styles.label}>
            {t("descriptionTask")}
          </label>
          <Textarea
            id="task-deacription"
            name="description"
            className={styles.textarea}
            value={descriptionFunc.value}
            isNotValid={descriprion.isNotValid}
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
          <AddTagsToTask/>
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

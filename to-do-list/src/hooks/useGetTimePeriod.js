import { useState } from "react";
import {
  isNotPeriodValid,
  isPeriodInputValid,
  isPeriodNotEmpty,
  isOneNotEmpty,
} from "../utils/validations";
import { getTimestamp } from "../utils/getTimestamp";

function useGetTimePeriod(isRequired) {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const [startDateBlur, setStartDateBlur] = useState(false);
  const [startTimeBlur, setStartTimeBlur] = useState(false);
  const [endDateBlur, setEndDateBlur] = useState(false);
  const [endTimeBlur, setEndTimeBlur] = useState(false);

  const isAllNotEmpty = isPeriodNotEmpty(
    startDate,
    startTime,
    endDate,
    endTime
  );

  const isAllEmpty = !isOneNotEmpty(startDate, startTime, endDate, endTime);

  let isValid;
  if (isRequired) {
    isValid = isPeriodInputValid(startDate, startTime, endDate, endTime);
  } else {
    if (isAllEmpty) {
      isValid = true;
    } else {
      isValid = isPeriodInputValid(startDate, startTime, endDate, endTime);
    }
  }

  const isNotValid = isNotPeriodValid(
    startDate,
    startTime,
    endDate,
    endTime,
    startDateBlur,
    startTimeBlur,
    endDateBlur,
    endTimeBlur
  );

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);

  const handleStartDateBlur = () => setStartDateBlur(true);
  const handleStartTimeBlur = () => setStartTimeBlur(true);
  const handleEndDateBlur = () => setEndDateBlur(true);
  const handleEndTimeBlur = () => setEndTimeBlur(true);

  const getStart = () =>
    getTimestamp(startDate, startTime, isValid && isAllNotEmpty);

  const getEnd = () => getTimestamp(endDate, endTime, isValid && isAllNotEmpty);

  const reset = () => {
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
  };

  const blurAll = () => {
    setStartDateBlur(true);
    setStartTime(true);
    setEndDate(true);
    setEndTime(true);
  };

  return {
    start: {
      date: {
        value: startDate,
        handleChange: handleStartDateChange,
        handleBlur: handleStartDateBlur,
        set: setStartDate,
        isNotValid: isNotValid.startDate,
      },
      time: {
        value: startTime,
        handleChange: handleStartTimeChange,
        handleBlur: handleStartTimeBlur,
        set: setStartTime,
        isNotValid: isNotValid.startTime,
      },
      get: getStart,
    },
    end: {
      date: {
        value: endDate,
        handleChange: handleEndDateChange,
        handleBlur: handleEndDateBlur,
        set: setEndDate,
        isNotValid: isNotValid.endDate,
      },
      time: {
        value: endTime,
        handleChange: handleEndTimeChange,
        handleBlur: handleEndTimeBlur,
        set: setEndTime,
        isNotValid: isNotValid.endTime,
      },
      get: getEnd,
    },
    reset,
    blurAll,
    isValid,
  };
}

export default useGetTimePeriod;

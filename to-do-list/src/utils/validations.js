import { getTimestamp } from "./getTimestamp";
import { isTimestampValid, isTimePeriodValid } from "./dateValidations";

export const isNotEmpty = (val) => val.trim().length > 0;
export const notRequired = (val) => val.trim().length >= 0;

export const isDateTimeValid = (date, time) => {
  const timestamp = getTimestamp(date, time, true);
  return isTimestampValid(timestamp);
};

export const isPeriodInputValid = (startDate, startTime, endDate, endTime) => {
  if (
    isNotEmpty(startDate) &&
    isNotEmpty(startTime) &&
    isNotEmpty(endTime) &&
    isNotEmpty(endDate)
  ) {
    return (
      isTimestampValid(startDate + "T" + startTime) &&
      isTimestampValid(endDate + "T" + endTime) &&
      isTimePeriodValid(startDate + "T" + startTime, endDate + "T" + endTime)
    );
  } else {
    return false;
  }
};

export const isPeriodNotEmpty = (startDate, startTime, endDate, endTime) => {
  return (
    isNotEmpty(startDate) &&
    isNotEmpty(startTime) &&
    isNotEmpty(endTime) &&
    isNotEmpty(endDate)
  );
};

export const isOneNotEmpty = (startDate, startTime, endDate, endTime) => {
  return (
    isNotEmpty(startDate) ||
    isNotEmpty(startTime) ||
    isNotEmpty(endTime) ||
    isNotEmpty(endDate)
  );
};

export const isNotPeriodValid = (
  startDate,
  startTime,
  endDate,
  endTime,
  startDateBlur,
  startTimeBlur,
  endDateBlur,
  endTimeBlur
) => {
  const isOneNotEmptyInp = isOneNotEmpty(
    startDate,
    startTime,
    endDate,
    endTime
  );

  let isNotValidStartDate =
    !isNotEmpty(startDate) && startDateBlur && isOneNotEmptyInp;

  let isNotValidStartTime =
    !isNotEmpty(startTime) && startTimeBlur && isOneNotEmptyInp;

  let isNotValidEndDate =
    !isNotEmpty(endDate) && endDateBlur && isOneNotEmptyInp;

  let isNotValidEndTime =
    !isNotEmpty(endTime) && endTimeBlur && isOneNotEmptyInp;

  if (isNotEmpty(startDate) && isNotEmpty(startTime)) {
    isNotValidStartDate = !isDateTimeValid(startDate, startTime);
    isNotValidStartTime = !isDateTimeValid(startDate, startTime);
  }

  if (isNotEmpty(endDate) && isNotEmpty(endTime)) {
    isNotValidEndDate = !isDateTimeValid(endDate, endTime);
    isNotValidEndTime = !isDateTimeValid(endDate, endTime);
  }

  return {
    startDate: isNotValidStartDate,
    startTime: isNotValidStartTime,
    endDate: isNotValidEndDate,
    endTime: isNotValidEndTime,
  };
};

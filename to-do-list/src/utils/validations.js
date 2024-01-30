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

  let message = null;

  let isNotValidStartDate =
    !isNotEmpty(startDate) && startDateBlur && isOneNotEmptyInp;
  
  if (isNotValidStartDate) message = 'Add start date or clean all fields';

  let isNotValidStartTime =
    !isNotEmpty(startTime) && startTimeBlur && isOneNotEmptyInp;
  
  if (isNotValidStartTime) message = 'Add start time or clean all fields';

  let isNotValidEndDate =
    !isNotEmpty(endDate) && endDateBlur && isOneNotEmptyInp;
  
  if (isNotValidEndDate) message = 'Add end date or clean all fields';

  let isNotValidEndTime =
    !isNotEmpty(endTime) && endTimeBlur && isOneNotEmptyInp;
  
  if (isNotValidEndTime) message = 'Add end date or clean all fields';

  if (isNotEmpty(startDate) && isNotEmpty(startTime)) {
    isNotValidStartDate = !isDateTimeValid(startDate, startTime);
    isNotValidStartTime = !isDateTimeValid(startDate, startTime);
    if (isNotValidStartDate || isNotValidStartTime) message = 'Start time is not valid timestamp';
  }

  if (isNotEmpty(endDate) && isNotEmpty(endTime)) {
    isNotValidEndDate = !isDateTimeValid(endDate, endTime);
    isNotValidEndTime = !isDateTimeValid(endDate, endTime);
    if (isNotValidEndDate || isNotValidEndTime) message = 'End time is not valid timestamp';
  }

  if (isNotEmpty(startDate) && isNotEmpty(startTime) && isNotEmpty(endDate) && isNotEmpty(endTime)) {
    isNotValidStartDate = !isPeriodInputValid(startDate, startTime, endDate,endTime);
    isNotValidStartTime = !isPeriodInputValid(startDate, startTime, endDate,endTime);
    isNotValidEndDate = !isPeriodInputValid(startDate, startTime, endDate,endTime);
    isNotValidEndTime = !isPeriodInputValid(startDate, startTime, endDate,endTime);
    if (isNotValidStartDate || isNotValidStartTime || isNotValidEndDate|| isNotValidEndTime) message = 'Period is not valid';
  }

  return {
    startDate: isNotValidStartDate,
    startTime: isNotValidStartTime,
    endDate: isNotValidEndDate,
    endTime: isNotValidEndTime,
    message: message 
  };
};

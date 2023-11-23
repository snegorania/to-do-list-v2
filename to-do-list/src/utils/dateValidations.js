export const isDateValid = (dateVal) => {
  const date = new Date(dateVal);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return date >= now;
};

export const isTimestampValid = (timestamp) => {
  if (timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    return date >= now;
  } else {
    return false;
  }
};

export const isTimePeriodValid = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const time = endDate - startDate;
  return time >= 0;
};

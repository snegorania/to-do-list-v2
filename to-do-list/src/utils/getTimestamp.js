export const getTimestamp = (date, time, isOk) => {
    if (isOk) {
      return date + "T" + time;
    } else {
      return null;
    }
};
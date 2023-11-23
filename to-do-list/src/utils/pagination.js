function pageNumberCount(length, rows) {
    const num =  length % rows;
    if (num || !length) {
        return (length - num) / rows + 1;
    } else {
        return length / rows;
    }
}

function pagination(array, rowsNum, pageNum) {
  let start = rowsNum * (pageNum - 1);
  let end = start + rowsNum;
  if (end > arr.length) {
    end = arr.length;
  }
  return {
    students: array.slice(start, end),
    page: pageNum,
  };
}

export default pagination;
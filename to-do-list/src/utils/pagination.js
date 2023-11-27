export function pageNumberCount(length, rows) {
  const num = length % rows;
  if (num || !length) {
    return (length - num) / rows + 1;
  } else {
    return length / rows;
  }
}

export function pagination(array, rowsNum, currPageNum, extraRows) {
  let start = rowsNum * (currPageNum - 1);
  let end = start + rowsNum + extraRows;
  if (end > array.length) {
    end = array.length;
  }
  return array.slice(start, end);
}

export function formPagControlArr(currentPage, pageNum) {
  let pagginationArr = [];
  if (pageNum <= 4) {
    for (let i = 1; i <= pageNum; i++) {
      pagginationArr.push(i);
    }
  } else if (currentPage >= pageNum - 2) {
    pagginationArr = [1, null];
    for (let i = currentPage - 1; i <= pageNum; i++) {
      pagginationArr.push(i);
    }
  } else if (currentPage <= 3) {
    for (let i = 1; i <= currentPage + 1; i++) {
      pagginationArr.push(i);
    }
    pagginationArr.push(null);
    pagginationArr.push(pageNum);
  } else {
    pagginationArr = [
      1,
      null,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      null,
      pageNum,
    ];
  }
  return pagginationArr;
}

export function formPageOptions(allPages) {
  const options=[];
  for (let i = 1; i <= allPages; i++) {
    options.push({value: String(i), label: String(i)});
  }

  return options;
}

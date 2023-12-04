
export const addTaskOrder = (id, tasks) => {
  const idsOrderArray = tasks.map((task) => task.id);
  localStorage.setItem(
    "tasksOrder",
    JSON.stringify([{ list: id, tasks: idsOrderArray }])
  );
  return JSON.parse(localStorage.getItem("tasksOrder"));
};

export const addNewListToOrder = (id, tasks, order) => {
  const idsOrderArray = tasks.map((task) => task.id);
  const myObj = { list: id, tasks: idsOrderArray };
  order.push(myObj);
  localStorage.setItem("tasksOrder", JSON.stringify(order));
  return JSON.parse(localStorage.getItem("tasksOrder"));
};

export const orderTasks = (id, orderId, tasks) => {
  const order = orderId.find((el) => el.list === id).tasks;
  let myArr = order.map((pos) => {
    return tasks.find((el) => el.id === pos);
  });
  const newItems = tasks.filter((el) => {
    return !order.includes(el.id);
  });
  if (newItems.length) {
    myArr = [...newItems, ...myArr];
  }
  return myArr;
};

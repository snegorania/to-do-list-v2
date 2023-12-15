import { createSlice } from "@reduxjs/toolkit";
import { pageNumberCount } from "../utils/pagination";

const singleListSlice = createSlice({
  name: "singleList",
  initialState: {
    id: "",
    title: "",
    description: null,
    isImportant: false,
    isMyDay: false,
    isTasks: false,
    isUsers: false,
    tasks: [],
    chosenId: "",
    userId: "",
    pagination: {
      currentPage: 1,
      allPages: 1,
      rows: 5,
      extraRows: 0,
    },
  },
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((el) => el.id !== action.payload);
    },
    updateTask(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      const newTaskItem = {
        ...state.tasks[taskIndex],
        title: action.payload.title || state.tasks[taskIndex].title,
        description:
          action.payload.description || state.tasks[taskIndex].description,
        startTime: action.payload.startTime || state.tasks[taskIndex].startTime,
        endTime: action.payload.endTime || state.tasks[taskIndex].endTime,
        deadline: action.payload.deadline || state.tasks[taskIndex].deadline,
        listId: action.payload.listId || state.tasks[taskIndex].listId,
        userId: action.payload.userId || state.tasks[taskIndex].userId,
        tags: action.payload.tags || state.tasks[taskIndex].userId.tags,
      };
      state.tasks[taskIndex] = newTaskItem;
    },
    updateTaskStatus(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      const newTaskItem = {
        ...state.tasks[taskIndex],
        isDone: action.payload.isDone,
        isMyDay: action.payload.isMyDay,
        isImportant: action.payload.isImportant
      };
      state.tasks[taskIndex] = newTaskItem;
    },
    setSingleList(state, action) {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.isImportant = action.payload.isImportant;
      state.isMyDay = action.payload.isMyDay;
      state.isTasks = action.payload.isTasks;
      state.isUsers = action.payload.isUsers;
      state.tasks = action.payload.tasks;
      state.userId = action.payload.userId;
      state.pagination.allPages = pageNumberCount(
        action.payload.tasks.length,
        state.pagination.rows
      );
    },
    setChosenTaskId(state, action) {
      state.chosenId = action.payload;
    },
    setPaginationRows(state, action) {
      state.pagination.rows = action.payload;
      state.pagination.allPages = pageNumberCount(
        state.tasks.length,
        action.payload
      );
      if (state.pagination.currentPage > state.pagination.allPages) {
        state.pagination.currentPage = state.pagination.allPages;
      }
      state.pagination.extraRows = 0;
    },
    setPaginationPage(state, action) {
      if (action.payload === -1) {
        state.pagination.currentPage = state.pagination.currentPage - 1;
      } else if (action.payload === 0) {
        state.pagination.currentPage = state.pagination.currentPage + 1;
      } else {
        state.pagination.currentPage = action.payload;
      }

      if (state.pagination.currentPage > state.pagination.allPages) {
        state.pagination.currentPage = state.pagination.allPages;
      }

      if (state.pagination.currentPage < 1) {
        state.pagination.currentPage = 1;
      }

      state.pagination.extraRows = 0;
    },
    resetPagination(state) {
      state.pagination.rows = 5;
      state.pagination.currentPage = 1;
      state.pagination.extraRows = 0;
    },
    openAll(state) {
      state.pagination.rows = state.tasks.length;
      state.pagination.currentPage = 1;
      state.pagination.extraRows = 0;
    },
    addExtraRows(state) {
      state.pagination.extraRows =
        state.pagination.extraRows + state.pagination.rows;
    },
  },
});

export const selectSingleList = (state) => state.singleList;

export const selectTasks = (state) => state.singleList.tasks;

export const selectPagination = (state) => state.singleList.pagination;

export const selectTaskById = (state, id) => {
  return state.singleList.tasks.find((task) => id === task.id);
};

export const selectChosenTaskId = (state) => state.singleList.chosenId;

export const {
  addTask,
  deleteTask,
  updateTask,
  setSingleList,
  setChosenTaskId,
  setPaginationPage,
  setPaginationRows,
  resetPagination,
  openAll,
  addExtraRows,
  updateTaskStatus
} = singleListSlice.actions;

export default singleListSlice.reducer;

export const getList = (id) => {
  return async (dispatch) => {
    const request = async () => {
      const response = await fetch(`http://localhost:8080/api/full-list/${id}`);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    };
    try {
      const data = await request();
      dispatch(setSingleList(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const postTask = (task) => {
  return async (dispatch) => {
    const requestTasks = async () => {
      const response = await fetch("http://localhost:8080/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    };
    try {
      const data = await requestTasks();
      dispatch(addTask(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const putTask = (task) => {
  return async (dispatch) => {
    console.log(task);
    const requestTasks = async () => {
      const response = await fetch(`http://localhost:8080/api/task/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await requestTasks();
      dispatch(updateTask(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeTaskStatus = (taskStatus) => {
  return async (dispatch) => {
    const requestTasks = async () => {
      const response = await fetch(`http://localhost:8080/api/task/status/${taskStatus.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskStatus),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await requestTasks();
      dispatch(updateTaskStatus(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTasks = (id) => {
  return async (dispatch) => {
    const requestTask = async () => {
      const response = await fetch(`http://localhost:8080/api/task/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await requestTask();
      dispatch(deleteTask(data));
    } catch (error) {
      console.log(error);
    }
  };
};

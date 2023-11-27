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
    deleteId: "",
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
        isDone: action.payload.isDone || state.tasks[taskIndex].isDone,
        startTime: action.payload.startTime || state.tasks[taskIndex].startTime,
        endTime: action.payload.endTime || state.tasks[taskIndex].endTime,
        deadline: action.payload.deadline || state.tasks[taskIndex].deadline,
        listId: action.payload.listId || state.tasks[taskIndex].listId,
      };
      state.lists[taskIndex] = newTaskItem;
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
      state.pagination.allPages = pageNumberCount(
        action.payload.tasks.length,
        state.pagination.rows
      );
    },
    setDeleteTaskId(state, action) {
      state.deleteId = action.payload;
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

export const selectDeleteTaskId = (state) => state.singleList.deleteId;

export const {
  addTask,
  deleteTask,
  updateTask,
  setSingleList,
  setDeleteTaskId,
  setPaginationPage,
  setPaginationRows,
  resetPagination,
  openAll,
  addExtraRows
} = singleListSlice.actions;

export default singleListSlice.reducer;

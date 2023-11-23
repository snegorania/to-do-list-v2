import { createSlice } from "@reduxjs/toolkit";
import { Lists } from "../app/data";
import { Tasks } from "../app/data";
import { Tags } from "../app/data";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    lists: Lists,
    tags: Tags,
    tasks: Tasks,
  },
  reducers: {
    resetMyDay(state) {
      const now = new Date();
      state.data.tasks = state.data.data.tasks.map((el) => {
        if (
          new Date(el.startTime).getFullYear() !== now.getFullYear() &&
          new Date(el.startTime).getMonth() !== now.getMonth() &&
          new Date(el.startTime).getDate() !== now.getDate()
        ) {
          return { ...el, isMyDay: false };
        } else return el;
      });
    },
    addListToData(state, action) {
      state.lists.push(action.payload);
    },
    addTaskToData(state, action) {
      state.tasks.push(action.payload);
    },
    addTagToData() {},
    deleteTaskToData(state, action) {
      state.tasks = state.tasks.filter((el) => el.id !== action.payload);
    },
    deleteListToData(state, action) {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
    deleteTagToData() {},
    updateTaskToData(state, action) {
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
    updateListToData(state, action) {
      const listIndex = state.lists.findIndex(
        (list) => list.id === action.payload.id
      );
      const newListItem = {
        ...state.lists[listIndex],
        title: action.payload.title,
        description: action.payload.description,
      };
      state.lists[listIndex] = newListItem;
    },
    updateTagToData() {},
  },
});

export const {
  addListToData,
  updateListToData,
  deleteListToData,
  addTagToData,
  updateTagToData,
  deleteTagToData,
  addTaskToData,
  updateTaskToData,
  deleteTaskToData,
} = dataSlice.actions;

export const selectListFromData = (state, ListId) => {
  const list = state.data.lists.find((el) => el.id === ListId);
  if (list.isImportant) {
    return {
      ...list,
      tasks: [...state.data.tasks.filter((el) => el.isImportant)],
    };
  } else if (list.isMyDay) {
    const now = new Date();
    return {
      ...list,
      tasks: [
        ...state.data.tasks.filter(
          (el) =>
            el.startTime &&
            ((new Date(el.startTime).getFullYear() === now.getFullYear() &&
              new Date(el.startTime).getMonth() === now.getMonth() &&
              new Date(el.startTime).getDate() === now.getDate()) ||
              el.isMyDay)
        ),
      ],
    };
  } else if (list.isTasks) {
    return {
      ...list,
      tasks: [...state.data.tasks.filter((el) => !el.listId)],
    };
  } else {
    return {
      ...list,
      tasks: [...state.data.tasks.filter((el) => el.listId === list.id)],
    };
  }
};

export const selectListsFromData = (state) => state.data.lists;

export default dataSlice.reducer;

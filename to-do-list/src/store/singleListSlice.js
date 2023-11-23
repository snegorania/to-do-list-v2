import { createSlice } from "@reduxjs/toolkit";

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
    deleteId: '',
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
    },
    setDeleteTaskId(state, action) {
      console.log(action.payload);
      state.deleteId = action.payload;
    }
  },
});

export const selectSingleList = (state) => state.singleList;

export const selectTaskById = (state, id) =>{
  return state.singleList.tasks.find((task) => id === task.id);
}

export const selectDeleteTaskId = state => state.singleList.deleteId;

export const { addTask, deleteTask, updateTask, setSingleList, setDeleteTaskId } =
  singleListSlice.actions;

export default singleListSlice.reducer;

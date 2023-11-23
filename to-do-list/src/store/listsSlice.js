import { createSlice } from "@reduxjs/toolkit";

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    deleteId: ''
  },
  reducers: {
    addList(state, action) {
      state.lists.push(action.payload);
    },
    deleteList(state, action) {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
    updateList(state, action) {
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
    setLists(state, action) {
      state.lists = action.payload;
    },
    setDeleteId(state, action) {
      state.deleteId = action.payload;
    },
  },
});

export const selectAllLists = (state) => state.lists.lists;
export const selectListById = (state, id) => state.lists.lists.find(list => id === list.id);
export const selectImportant = (state) => state.lists.lists.find(list => list.isImportant).id;
export const selectDeleteList = (state) => state.lists.deleteId;
export const { addList, deleteList, updateList, setLists, setDeleteId } = listsSlice.actions;

export default listsSlice.reducer;

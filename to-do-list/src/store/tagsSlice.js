import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [
      {
        id: "tag1",
        title: "reacding",
      },
      {
        id: "tag2",
        title: "writing",
      },
      {
        id: "tag3",
        title: "editing",
      },
      {
        id: "tag4",
        title: "geting",
      },
      {
        id: "tag5",
        title: "auch",
      },
    ],
  },
  reducers: {
    addTag(state, action) {
      state.tags.push(action.payload);
    },

    editTag(state, action) {
      const index = state.tags.findIndex((el => el.id === action.payload.id));
      const newTagItem = {
        ...state.tags[index],
        title: action.payload.title,
      };
      state.tags[index] = newTagItem;
    },

    deleteTag(state, action) {
      state.tags = state.tags.filter((el) => el.id !== action.payload);
    },
  },
});


export const {addTag, deleteTag, editTag} = tagsSlice.actions;
export const selectAllTags = (state) => state.tags.tags;

export default tagsSlice.reducer;

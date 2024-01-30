import { createSlice } from "@reduxjs/toolkit";
import { cleanTags, changeTags } from "./singleListSlice";

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
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

    setTags(state, action) {
      state.tags = action.payload;
    }
  },
});


export const {addTag, deleteTag, editTag, setTags} = tagsSlice.actions;
export const selectAllTags = (state) => state.tags.tags;

export default tagsSlice.reducer;

export const getTags = () => {
  return async (dispatch) => {
    const requestTags = async() => {
      const response = await fetch('http://localhost:8080/api/tag');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      return data;
    }
    try {
      const data = await requestTags();
      dispatch(setTags(data));
    } catch(error) {
      console.log(error);
    }
  }
}

export const postTag = (tag) => {
  return async (dispatch) => {
    const requestTags = async() => {
      const response = await fetch('http://localhost:8080/api/tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tag)
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      return data;
    }
    try {
      const data = await requestTags();
      dispatch(addTag(data));
    } catch(error) {
      console.log(error);
    }
  }
}

export const putTag = (tag) => {
  return async (dispatch) => {
    const requestTags = async() => {
      const response = await fetch(`http://localhost:8080/api/tag/${tag.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tag)
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      return data
    }

    try {
      const data = await requestTags();
      dispatch(editTag(data));
      dispatch(changeTags(data));
    } catch(error) {
      console.log(error);
    }
  }
}

export const deleteTags = (id) => {
  return async (dispatch) => {
    const requestTags = async() => {
      const response = await fetch(`http://localhost:8080/api/tag/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      return data
    }

    try {
      const data = await requestTags();
      dispatch(deleteTag(data));
      dispatch(cleanTags(data));
    } catch(error) {
      console.log(error);
    }
  }
}

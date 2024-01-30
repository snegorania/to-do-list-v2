import { createSlice } from "@reduxjs/toolkit";

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    chosenId: '',
    loading: false
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
    setChosenId(state, action) {
      state.chosenId = action.payload;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
  },
});
 

export const selectAllLists = (state) => state.lists.lists;
export const selectListsLoading = (state) => state.lists.loading;
export const selectListById = (state, id) => state.lists.lists.find(list => id === list.id);
export const selectImportant = (state) => state.lists.lists.find(list => list.isImportant).id;
export const selectChosenId = (state) => state.lists.chosenId;
export const selectChosenList = (state) => state.lists.lists.find(list => state.lists.chosenId === list.id);
export const { addList, deleteList, updateList, setLists, setChosenId, setLoading } = listsSlice.actions;

export default listsSlice.reducer;

export const getLists = () => {
  return async (dispatch) => {

    const fetchLists = async () => {
      const response = await fetch('http://localhost:8080/api/list');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = response.json();
      return data;
    }

    try{
      dispatch(setLoading());
      const data = await fetchLists();
      dispatch(setLists(data));
      dispatch(setLoading());
    } catch (error) {
      console.log(error);
    }
  }
}

export const postList = (list) => {
  return async (dispatch) => {
    const fetchLists = async () => {
      const response = await fetch('http://localhost:8080/api/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      return data;
    }

    try {
      dispatch(setLoading());
      const data = await fetchLists();
      dispatch(addList(data));
      dispatch(setLoading());
    } catch (error) {
      console.log(error);
    }
  }
}

export const putList = (list) => {
  return async (dispatch) => {
    const fetchLists = async () => {
      const response = await fetch(`http://localhost:8080/api/list/${list.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = response.json();
      return data;
    }

    try{
      dispatch(setLoading());
      const data = await fetchLists();
      dispatch(updateList(data));
      dispatch(setLoading());
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteListRequest = (id) => {
  return async (dispatch) => {
    const fetchLists = async () => {
      const response = await fetch(`http://localhost:8080/api/list/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const responseId = await response.json();
      return responseId;
    }
    try {
      dispatch(setLoading());
      const deleteId = await fetchLists();
      dispatch(deleteList(deleteId));
      dispatch(setLoading());
    } catch (error) {
      console.log(error);
    }
  }
}

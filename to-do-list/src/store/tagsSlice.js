import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        tags:[]
    },
    reducers: {
        addTag(state, action){
            state.tags.push(action.payload);
        },
        deleteTag(state, action) {
            state.tags = state.tags.filter(el => el.id !== action.payload);
        }
    }
});

export default tagsSlice;
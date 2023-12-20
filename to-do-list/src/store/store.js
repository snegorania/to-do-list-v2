// imports configure store function and reducers for lists, tasks, users, current user of app   
import { configureStore } from '@reduxjs/toolkit'
import listsReducer from './listsSlice';
import singleListReducer from './singleListSlice';
import tagsReducer from './tagsSlice';

// configures store end export it
export default configureStore({
    reducer: {
        lists: listsReducer,
        singleList: singleListReducer,
        tags: tagsReducer
    }
})
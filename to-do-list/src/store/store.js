// imports configure store function and reducers for lists, tasks, users, current user of app   
import { configureStore } from '@reduxjs/toolkit'
import listsReducer from './listsSlice';
import dataReducer from './dataSlice';
import singleListReducer from './singleListSlice';

// configures store end export it
export default configureStore({
    reducer: {
        lists: listsReducer,
        data: dataReducer,
        singleList: singleListReducer
    }
})
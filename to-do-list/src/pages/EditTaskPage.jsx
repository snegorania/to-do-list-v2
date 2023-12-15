import React from 'react';
import TaskForm from '../components/Tasks/TaskForm/TaskForm';
import { selectTaskById, selectChosenTaskId } from '../store/singleListSlice';
import { useSelector } from 'react-redux';


const EditTaskPage = () => {
    const id = useSelector(selectChosenTaskId);
    const task = useSelector((state) => selectTaskById(state, id));
    return <TaskForm defaultValue={task} method={'put'}/>
}

export default EditTaskPage;
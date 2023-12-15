import React from "react";
import TaskForm from "../components/Tasks/TaskForm/TaskForm";

const AddTaskPage = () => {
    return <TaskForm method={'post'} defaultValue={{}}/>
}

export default AddTaskPage;
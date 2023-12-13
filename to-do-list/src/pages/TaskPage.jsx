import React from "react";
import TaskInfo from "../components/Tasks/TaskInfo/TaskInfo";
import { useParams } from "react-router-dom";

const TaskPage = () => {
    const id = useParams().taskId;
    return <TaskInfo id={Number(id)}/>
}

export default TaskPage;
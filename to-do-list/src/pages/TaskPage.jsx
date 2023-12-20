import React from "react";
import TaskInfo from "../components/Tasks/TaskInfo/TaskInfo";
import { useParams } from "react-router-dom";

const TaskPage = ({isFilter}) => {
    const id = useParams().taskId;
    return <TaskInfo id={Number(id)} isFilter={isFilter}/>
}

export default TaskPage;
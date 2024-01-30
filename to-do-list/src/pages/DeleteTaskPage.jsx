import React from 'react';
import DeleteModal from '../components/UI/DeleteModal/DeleteModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectChosenTaskId, deleteTasks } from '../store/singleListSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DeleteTaskPage = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const id = useSelector(selectChosenTaskId);
    const dispatch = useDispatch();
    const handleDelete = () => {
        const tasksOrder = JSON.parse(localStorage.getItem("tasksOrder"));
        const newOrder = [];
        for (let i = 0; i < tasksOrder.length; i++) {
            newOrder.push({list: tasksOrder[i].list, tasks: tasksOrder[i].tasks.filter(el => el !== id)});
        }
        localStorage.removeItem("taskOrder");
        localStorage.setItem("tasksOrder", JSON.stringify(newOrder));
        dispatch(deleteTasks(id));
        navigate('..');
    }

    return <DeleteModal mode={t('taskMode')} onDelete={handleDelete}/>
}

export default DeleteTaskPage;
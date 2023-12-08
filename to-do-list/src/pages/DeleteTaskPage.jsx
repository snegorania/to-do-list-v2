import React from 'react';
import DeleteModal from '../components/UI/DeleteModal/DeleteModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectDeleteTaskId, deleteTask } from '../store/singleListSlice';
import { deleteTaskToData } from '../store/dataSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DeleteTaskPage = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const id = useSelector(selectDeleteTaskId);
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteTaskToData(id));
        dispatch(deleteTask(id));
        navigate('..');
    }

    return <DeleteModal mode={t('taskMode')} onDelete={handleDelete}/>
}

export default DeleteTaskPage;
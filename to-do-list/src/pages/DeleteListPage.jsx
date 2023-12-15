import React from 'react';
import DeleteModal from '../components/UI/DeleteModal/DeleteModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectChosenId, deleteListRequest, selectImportant } from '../store/listsSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DeleteListPage = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const id = useSelector(selectChosenId);
    const importantId = useSelector(selectImportant);
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        const tasksOrder = JSON.parse(localStorage.getItem("tasksOrder"));
        const newOrder = tasksOrder.filter(el => el.list !== id);
        localStorage.setItem("tasksOrder", JSON.stringify(newOrder));
        dispatch(deleteListRequest(id));
        navigate(`/lists/${importantId}/tasks`);
    }

    return <DeleteModal mode={t('listMode')} onDelete={handleDelete}/>
}

export default DeleteListPage;
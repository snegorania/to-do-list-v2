import React from 'react';
import DeleteModal from '../components/UI/DeleteModal/DeleteModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectChosenId, deleteListRequest } from '../store/listsSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DeleteListPage = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const id = useSelector(selectChosenId);
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        dispatch(deleteListRequest(id));
        navigate('..');
    }

    return <DeleteModal mode={t('listMode')} onDelete={handleDelete}/>
}

export default DeleteListPage;
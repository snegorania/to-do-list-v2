import React from 'react';
import DeleteModal from '../components/UI/DeleteModal/DeleteModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectChosenId, deleteList } from '../store/listsSlice';
import { deleteListToData } from '../store/dataSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DeleteListPage = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const id = useSelector(selectChosenId);
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteListToData(id));
        dispatch(deleteList(id));
        navigate('..');
    }

    return <DeleteModal mode={t('listMode')} onDelete={handleDelete}/>
}

export default DeleteListPage;
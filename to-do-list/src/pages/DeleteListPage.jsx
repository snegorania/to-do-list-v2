import React from 'react';
import DeleteModal from '../components/UI/DeleteModal/DeleteModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectDeleteList, deleteList } from '../store/listsSlice';
import { deleteListToData } from '../store/dataSlice';
import { useNavigate } from 'react-router-dom';

const DeleteListPage = () => {
    const navigate = useNavigate();
    const id = useSelector(selectDeleteList);
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteListToData(id));
        dispatch(deleteList(id));
        navigate('..');
    }

    return <DeleteModal mode="list" onDelete={handleDelete}/>
}

export default DeleteListPage;
import React from 'react';
import ListForm from '../components/Lists/ListForm/ListForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectListById } from '../store/listsSlice';

const EditListPage = () => {
    const params = useParams();
    const id = params.listId;
    const list = useSelector((state) => selectListById(state, id));
    return <ListForm method='put' listForEdit={{...list}}/>
}

export default EditListPage;
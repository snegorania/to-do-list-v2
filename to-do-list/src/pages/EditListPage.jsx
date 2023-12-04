import React from 'react';
import ListForm from '../components/Lists/ListForm/ListForm';
import { useSelector } from 'react-redux';
import { selectChosenList } from '../store/listsSlice';

const EditListPage = () => {
    const list = useSelector(selectChosenList);
    return <ListForm method='put' listForEdit={{...list}}/>
}

export default EditListPage;
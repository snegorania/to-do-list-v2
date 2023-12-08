import React, {useState} from 'react';
import TagModal from '../../Tags/TagModal/TagModal';
import styles from './TagModalButton.module.css';

const TagModalButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(prev => !prev);
    }

    return <>
        <button onClick={handleOpen} className={styles.button}>tags</button>
        {isOpen && <TagModal onClose={handleOpen}/>}
    </>
}

export default TagModalButton;
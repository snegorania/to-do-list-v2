import React, {useState} from 'react';
import TagModal from '../../Tags/TagModal/TagModal';
import styles from './TagModalButton.module.css';
import { useTranslation } from 'react-i18next';

const TagModalButton = () => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(prev => !prev);
    }

    return <>
        <button onClick={handleOpen} className={styles.button}>{t("tags")}</button>
        {isOpen && <TagModal onClose={handleOpen}/>}
    </>
}

export default TagModalButton;
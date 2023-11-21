import React, { ReactNode } from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/popups.module.css';

interface PopupProps {
//   isOpen?: boolean;
  onClose: () => void;
}

const DeleteTopic: React.FC<PopupProps> = ({ isOpen, onClose }) => {
//   if (!isOpen) {
//     return null;
//   }

  return (
    <div className={`${styles.confirmPopup} ${styles.greyNotif}`}>
        <p className={styles.messageHeader} style={{ color: "var(--Nice_Blue, rgb(156,165,216))" }} >Delete Topic?</p>
        <p className={styles.messageContent} style={{alignSelf: "center"}}>This action cannot be undone.</p>
        <span className={styles.actionButtons}>
          <Button size="small" fillBorderVariant="border" colorVariant = 'white' onClick={onClose}>
            CANCEL
          </Button>
          <Button size="small" fillBorderVariant="fill" colorVariant = 'red' onClick={onClose}>
            DELETE
          </Button>
        </span>
    </div>
  );
};

export default DeleteTopic;

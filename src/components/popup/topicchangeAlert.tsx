import React, { ReactNode } from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/popups.module.css';

interface PopupProps {
//   isOpen?: boolean;
  onClose: () => void;
}

const TopicChangeAlert: React.FC<PopupProps> = ({ isOpen, onClose }) => {
//   if (!isOpen) {
//     return null;
//   }

return (
    <div className={`${styles.Notif} ${styles.redNotif}`} style={{ alignItems: 'center'}}>
        <span className={styles.topRow}>
            <span className={styles.titleCol} >
                <Button buttonType = 'icon-button' size="small" fillBorderVariant="no-background" leftIcon={<Icons.ExclamationIcon alt="Exclamation Icon" color="red" size="small"/>}></Button> {/* pop up icon button */}
                <p className={styles.messageHeader} style={{ color: "var(--Red, #DE5C64)" }}>Topic Change Alert</p>
            </span>
            <Button buttonType = 'icon-button' size="small" fillBorderVariant="no-background" leftIcon={<Icons.CancelIcon alt="Close" color="white" size="small"/>}onClick={onClose}></Button> 
        </span> 
        <p className={styles.messageContent}> A topic change has been detected. Please select one of the following actions:</p>
        <span className={styles.actionButtons}>
          <Button size="small" fillBorderVariant="border" colorVariant = 'white' onClick={onClose}>
            REPORT INACCURATE
          </Button>
          <Button size="small" fillBorderVariant="border" colorVariant = 'white' onClick={onClose}>
            CREATE NEW TOPIC
          </Button>
        </span>
    </div>
  );
};


export default TopicChangeAlert;

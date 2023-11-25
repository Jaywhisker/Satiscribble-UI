import React, { ReactNode } from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/popups.module.css';

interface PopupProps {
//   isOpen?: boolean;
  onClose: () => void;
}

const AgendaAlert: React.FC<PopupProps> = ({ isOpen, onClose }) => {
//   if (!isOpen) {
//     return null;
//   }

  return (
    <div className={`${styles.Notif} ${styles.redNotif}`}>
        <span className={styles.topRow}>
            <span className={styles.titleCol} >
                <Button buttonType = 'icon-button' size="small" fillBorderVariant="no-background" leftIcon={<Icons.ExclamationIcon alt="Exclamation Icon" color="red" size="small"/>}></Button> {/* pop up icon button */}
                <p className={styles.messageHeader} style={{ color: "var(--Red, #DE5C64)" }}>Agenda Alert</p>
            </span>
            <Button buttonType = 'icon-button' size="small" fillBorderVariant="no-background" leftIcon={<Icons.CancelIcon alt="Close" color="white" size="small"/>}onClick={onClose}></Button> 
        </span> 
        <p className={styles.messageContent}> It appears we may have deviated from the agenda. Please review and update to stay on track with the agenda.</p>
        <span className={styles.actionButtons}>
          <Button size="small" fillBorderVariant="border" colorVariant = 'white' onClick={onClose}>
            REPORT INACCURATE
          </Button>
        </span>
    </div>
  );
};

export default AgendaAlert;

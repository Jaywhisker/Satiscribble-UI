import React, { ReactNode } from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/popups.module.css';

interface PopupProps {
//   isOpen?: boolean;
  onClose: () => void;
}

const InactivityAlert: React.FC<PopupProps> = ({ isOpen, onClose }) => {
//   if (!isOpen) {
//     return null;
//   }

  return (
    <div className={`${styles.Notif} ${styles.greyNotif}`}>
        <span className={styles.topRow}>
            <span className={styles.titleCol} >
                <Button buttonType = 'icon-button' size="small" fillBorderVariant="no-background" leftIcon={<Icons.NotificationIcon alt="Notification Icon" color="orange" size="small"/>}></Button> {/* pop up icon button */}
                <p className={styles.messageHeader} style={{ color: "var(--Orange, #FFCE85)" }} >Are you still there?</p>
            </span>
            <Button buttonType = 'icon-button' size="small" fillBorderVariant="no-background" leftIcon={<Icons.CancelIcon alt="Close" color="white" size="small"/>}onClick={onClose}></Button> 
        </span> 
        <p className={styles.messageContent}> It's been 5 minutes since the last update to meeting minutes. Please review and update to stay on track with the agenda.</p>
        <span className={styles.actionButtons}>
          <Button size="small" fillBorderVariant="border" colorVariant = 'white' onClick={onClose}>
              Snooze 15 minutes
          </Button>
        </span>
    </div>
  );
};

export default InactivityAlert;

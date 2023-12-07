import React from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/components/popups.module.css';

interface PopupProps {
  isOpen?: boolean;
  onClose: () => void;
}

const InactivityAlert: React.FC<PopupProps> = ({ isOpen, onClose }) => {


  const handleIsOpen = () => {
    console.log('Popup is now open and is shown');
  };

  // Placeholder function for onClose
  const handleClose = () => {
    console.log('Closing the popup');
    onClose();
  };

  const handleSnooze = () => {
    console.log('Snooze for 15 minutes');
    onClose();
  };

  const handleSnooze = () => {
    console.log('Snooze for 15 minutes');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.Notif} ${styles.greyNotif}`}>
      <span className={styles.topRow}>
        <span className={styles.titleCol}>
          <Button
            buttonType="icon-button"
            size="small"
            fillBorderVariant="no-background"
            leftIcon={<Icons.GeneralIcon alt="Notification Icon" color="orange" size="small" name='notification' />}
          ></Button>
          <p className={styles.messageHeader} style={{ color: "var(--Orange, #FFCE85)" }}>
            Are you still there?
          </p>
        </span>
        <Button
          buttonType="icon-button"
          size="small"
          fillBorderVariant="no-background"
          leftIcon={<Icons.GeneralIcon alt="Close" color="white" size="small" name = 'cancel'/>}
          onClick={() => {handleClose()}}
        ></Button>
      </span>
      <p className={styles.messageContent}>
        It's been 5 minutes since the last update to meeting minutes. Please review and update to stay on track with the agenda.
      </p>
      <span className={styles.actionButtons}>
        <Button size="small" fillBorderVariant="border" colorVariant="white" onClick={handleSnooze}>
          Snooze 15 minutes
        </Button>
      </span>
    </div>
  );
};

export default InactivityAlert;
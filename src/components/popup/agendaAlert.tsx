import React from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/popups.module.css';

interface PopupProps {
  isOpen?: boolean;
  onClose: () => void;
}

const AgendaAlert: React.FC<PopupProps> = ({ isOpen, onClose }) => {

  const handleIsOpen = () => {
    console.log('Popup is now open and is shown');
  };

  // Placeholder functions
  const handleClose = () => {
    console.log('Closing the popup');
    onClose();
  };

  const handleReport = () => {
    console.log('Reporting inaccuracy');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.Notif} ${styles.redNotif}`}>
      <span className={styles.topRow}>
        <span className={styles.titleCol}>
          <Button
            buttonType="icon-button"
            size="small"
            fillBorderVariant="no-background"
            leftIcon={<Icons.GeneralIcon alt="Exclamation Icon" color="red" size="small" name='exclamation' />}
          ></Button>
          {/* pop up icon button */}
          <p className={styles.messageHeader} style={{ color: "var(--Red, #DE5C64)" }}>
            Agenda Alert
          </p>
        </span>
        <Button
          buttonType="icon-button"
          size="small"
          fillBorderVariant="no-background"
          leftIcon={<Icons.GeneralIcon alt="Close" color="white" size="small" name='cancel' />}
          onClick={handleClose}
        ></Button>
      </span>
      <p className={styles.messageContent}>
        It appears we may have deviated from the agenda. Please review and update to stay on track with the agenda.
      </p>
      <span className={styles.actionButtons}>
        <Button size="small" fillBorderVariant="border" colorVariant="white" onClick={handleReport}>
          REPORT INACCURATE
        </Button>
      </span>
    </div>
  );
};

export default AgendaAlert;
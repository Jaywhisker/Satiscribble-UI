import React from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/popups.module.css';

interface PopupProps {
  isOpen?: boolean;
  onClose: () => void;
}

const TopicChangeAlert: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  // Placeholder function for isOpen
  const handleIsOpen = () => {
    console.log('Popup is now open and is shown');
  };

  // Placeholder function for onClose
  const handleClose = () => {
    console.log('Closing the popup');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.Notif} ${styles.redNotif}`} style={{ alignItems: 'center' }}>
      <span className={styles.topRow}>
        <span className={styles.titleCol}>
          <Button
            buttonType="icon-button"
            size="small"
            fillBorderVariant="no-background"
            leftIcon={<Icons.GeneralIcon alt="Exclamation Icon" color="red" size="small" name="exclamation" />}
          ></Button>
          {/* pop up icon button */}
          <p className={styles.messageHeader} style={{ color: "var(--Red, #DE5C64)" }}>
            Topic Change Alert
          </p>
        </span>
        <Button
          buttonType="icon-button"
          size="small"
          fillBorderVariant="no-background"
          leftIcon={<Icons.GeneralIcon alt="Close" color="white" size="small" name = 'cancel'/>}
          onClick={handleClose}
        ></Button>
      </span>
      <p className={styles.messageContent}>A topic change has been detected. Please select one of the following actions:</p>
      <span className={styles.actionButtons}>
        <Button size="small" fillBorderVariant="border" colorVariant="white" onClick={handleClose}>
          REPORT INACCURATE
        </Button>
        <Button size="small" fillBorderVariant="border" colorVariant="white" onClick={handleClose}>
          CREATE NEW TOPIC
        </Button>
      </span>
    </div>
  );
};

export default TopicChangeAlert;

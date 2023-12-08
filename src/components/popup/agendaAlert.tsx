import React from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/components/popups.module.css';

interface PopupProps {
  isOpen?: boolean;
  onClose: () => void;
  inaccuracyValue: number;
  setInaccuracyValue: any;
}

const AgendaAlert: React.FC<PopupProps> = ({ isOpen, onClose, inaccuracyValue, setInaccuracyValue }) => {


  // Placeholder functions
  const handleClose = () => {
    console.log('Closing the popup');
    onClose();
  };

  const handleReport = () => {
    console.log('Reporting agenda inaccuracy, inaccuracy count', inaccuracyValue+1);
    setInaccuracyValue(inaccuracyValue + 1)
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
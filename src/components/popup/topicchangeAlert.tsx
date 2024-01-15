import React, { useEffect }  from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/components/popups.module.css';

interface PopupProps {
  isOpen?: boolean;
  onClose: () => void;
  inaccuracyValue: number;
  setInaccuracyValue: any;
  createNewTopic: () => void;
  stateValue?: boolean;
}

const TopicChangeAlert: React.FC<PopupProps> = ({ isOpen, onClose, inaccuracyValue, setInaccuracyValue, createNewTopic, stateValue }) => {

  // Placeholder function for onClose
  const handleClose = () => {
    console.log('Closing the popup');
    onClose();
  };

  useEffect(() => {
    console.log(stateValue)
    if (stateValue) {
      handleClose()
    }
  }, [stateValue])

  const handleReport = () => {
    console.log('Reporting topic inaccuracy, inaccuracy count', inaccuracyValue+1);
    setInaccuracyValue(inaccuracyValue + 1)
    onClose();
  };

  const handleCreate = () => {
    console.log('Creating new topic');
    createNewTopic()
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
          leftIcon={<Icons.GeneralIcon alt="Close" color="white" size="small" name='cancel' />}
          onClick={handleClose}
        ></Button>
      </span>
      <p className={styles.messageContent}>A topic change has been detected. Please select one of the following actions:</p>
      <span className={styles.actionButtons}>
      <Button size="small" fillBorderVariant="border" colorVariant="white" onClick={handleReport}>
          REPORT INACCURATE
        </Button>
        <Button size="small" fillBorderVariant="border" colorVariant="white" onClick={handleCreate}>
          CREATE NEW TOPIC
        </Button>
      </span>
    </div>
  );
};

export default TopicChangeAlert;
import React from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/components/popups.module.css';

import { createGlossaryEntry } from '@/functions/api/glossaryActions';

interface PopupProps {
  detectedAbbrev?: string;
  isOpen?: boolean;
  onClose: () => void;
  toast: any;
}

const DetectAlert: React.FC<PopupProps> = ({ detectedAbbrev = 'Detected abbreviation as <abbrev> : <full term>', isOpen, onClose, toast }) => {

  // Placeholder function for onClose
  const handleClose = () => {
    console.log('Closing the popup');
    onClose();
  };


  const handleAdd = async() => {
    console.log('Adding abbreviation');
    onClose();

    const minutesID = localStorage.getItem('minutesID');
    const chatHistoryID = localStorage.getItem('chatHistoryID')
    var abbreviation = detectedAbbrev.split("-")[0].trim().toUpperCase();
    var meaning = detectedAbbrev.split("-")[1].trim().toLowerCase();
    
    var response = await createGlossaryEntry(minutesID, chatHistoryID, abbreviation, meaning)
    if (response !== undefined) {
      console.log(response.ERROR)
    } else {
      toast.glossaryAdd()
    }
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
            leftIcon={<Icons.GeneralIcon alt="Check Icon" color="purple" size="small" name='check' />}
          ></Button>
          <p className={styles.messageHeader} style={{ color: "var(--Nice_Blue, rgb(156,165,216))" }}>
            We've detected an abbreviation
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
      <span className={styles.messageContent}>
        <p style={{ marginBlock: "0" }}>{detectedAbbrev}</p>
      </span>
      <span className={styles.actionButtons}>
        <Button size="small" fillBorderVariant="border" colorVariant="white" onClick={handleAdd}>
          ADD TO GLOSSARY
        </Button>
      </span>
    </div>
  );
};

export default DetectAlert;
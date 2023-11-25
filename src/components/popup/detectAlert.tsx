import React, { ReactNode } from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/popups.module.css';

interface PopupProps {
//   isOpen?: boolean;
  onClose: () => void;
}

const DetectAlert: React.FC<PopupProps> = ({ isOpen, onClose }) => {
//   if (!isOpen) {
//     return null;
//   }

  return (
    <div className={`${styles.Notif} ${styles.greyNotif}`}>
        <span className={styles.topRow}>
            <span className={styles.titleCol} >
                <Button buttonType = 'icon-button' size="small" fillBorderVariant="no-background" leftIcon={<Icons.CheckIcon alt="Check Icon" color="purple" size="small" />}></Button> {/* pop up icon button */}
                <p className={styles.messageHeader} style={{ color: "var(--Nice_Blue, rgb(156,165,216))" }} >We've detected an abbreviation</p>
            </span>
            <Button buttonType = 'icon-button' size="small" fillBorderVariant="no-background" leftIcon={<Icons.CancelIcon alt="Close" color="white" size="small"/>}onClick={onClose}></Button> 
        </span>
        <span className={styles.messageContent}>
          <p style={{ marginBlock: "0"  }}>Abbreviation will be added with no response:</p>
          <p style={{ marginBlock: "0"  }}>ABA - Applied Behavior Analysis</p>
        </span>
        <span className={styles.actionButtons}>
          <Button size="small" fillBorderVariant="border" colorVariant = 'white' onClick={onClose}>
            ADD TO GLOSSARY
          </Button>
        </span>
    </div>
  );
};

export default DetectAlert;

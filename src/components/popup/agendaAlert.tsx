import React, { useEffect, useRef } from "react";
import { Button } from "../buttons";
import Icons from "../icons/icons";
import styles from "@/styles/components/popups.module.css";

interface PopupProps {
  isOpen?: boolean;
  onClose: () => void;
  inaccuracyValue: number;
  setInaccuracyValue: any;
  stateValue?: boolean;
}

const AgendaAlert: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  inaccuracyValue,
  setInaccuracyValue,
  stateValue,
}) => {
  // Placeholder functions
  const handleClose = () => {
    onClose();
  };

  const handleReport = () => {
    // console.log('Reporting agenda inaccuracy, inaccuracy count', inaccuracyValue+1);
    setInaccuracyValue(inaccuracyValue + 1);
    onClose();
  };

  useEffect(() => {
    console.log(stateValue);
    if (stateValue) {
      handleClose();
    }
  }, [stateValue]);


  const initialized = useRef(null)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setTimeout(() => {
        handleClose();
      }, 10000);
    }
  }, []);

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
            leftIcon={
              <Icons.GeneralIcon
                alt="Exclamation Icon"
                color="red"
                size="small"
                name="exclamation"
              />
            }
          ></Button>
          {/* pop up icon button */}
          <p
            className={styles.messageHeader}
            style={{ color: "var(--Red, #DE5C64)" }}
          >
            Agenda Alert
          </p>
        </span>
        <Button
          buttonType="icon-button"
          size="small"
          fillBorderVariant="no-background"
          leftIcon={
            <Icons.GeneralIcon
              alt="Close"
              color="white"
              size="small"
              name="cancel"
            />
          }
          onClick={handleClose}
        ></Button>
      </span>
      <p className={styles.messageContent}>
        It appears we may have deviated from the agenda. Please review and
        update to stay on track with the agenda.
      </p>
      <span className={styles.actionButtons}>
        <Button
          size="small"
          fillBorderVariant="border"
          colorVariant="white"
          onClick={handleReport}
        >
          REPORT INACCURATE
        </Button>
      </span>
    </div>
  );
};

export default AgendaAlert;

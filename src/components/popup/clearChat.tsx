import React from "react";
import { Button } from "../buttons";
import Icons from "../icons/icons";
import styles from "@/styles/components/popups.module.css";

interface ClearChatProps {
  isOpen?: boolean;
}

const ClearChat: React.FC<ClearChatProps> = ({ isOpen, onClose, onDelete }) => {
  const handleClose = () => {
    onClose();
  };

  const handleClear = () => {
    onDelete();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.confirmPopup} ${styles.greyNotif}`}>
      <p
        className={styles.messageHeader}
        style={{ color: "var(--Nice_Blue, rgb(156,165,216))" }}
      >
        Clear Chat?
      </p>
      <p className={styles.messageContent} style={{ alignSelf: "center" }}>
        This action cannot be undone.
      </p>
      <span className={styles.actionButtons}>
        <Button
          size="small"
          fillBorderVariant="border"
          colorVariant="white"
          onClick={handleClose}
        >
          CANCEL
        </Button>
        <Button
          size="small"
          fillBorderVariant="fill"
          colorVariant="red"
          onClick={handleClear}
        >
          CLEAR
        </Button>
      </span>
    </div>
  );
};

export default ClearChat;

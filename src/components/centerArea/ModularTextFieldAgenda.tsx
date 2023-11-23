import React, { forwardRef } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";

const ModularTextFieldAgenda = forwardRef((props, ref) => {
  const { label, placeholder, onChange, onKeyDown } = props; // Use onKeyDown

  return (
    <div className={styles.agendaBlockTextFieldHolder}>
      <p className={`${styles.meetingBlockTextFieldLabel} ${styles.meetingBlockTextFieldText}`}>
        {label}
      </p>
      <input
        ref={ref}
        type="text"
        className={`${styles.meetingBlockTextField} ${styles.meetingBlockTextFieldText}`}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown} 
      />
    </div>
  );
});

export default ModularTextFieldAgenda;
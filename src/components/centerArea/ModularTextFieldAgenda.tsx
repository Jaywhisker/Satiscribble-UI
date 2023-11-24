import React, { forwardRef } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";

const ModularTextFieldAgenda = forwardRef((props, ref) => {
  const { label, placeholder, onChange, onKeyDown, readOnly } = props; // Include readOnly in props

  return (
    <div className={styles.agendaBlockTextFieldHolder}>
      {label && ( // Render label only if it exists
        <p className={`${styles.meetingBlockTextFieldLabel} ${styles.meetingBlockTextFieldText}`}>
          {label}
        </p>
      )}
      <input
        ref={ref}
        type="text"
        className={`${styles.meetingBlockTextField} ${styles.meetingBlockTextFieldText}`}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        readOnly={readOnly}
      />
    </div>
  );
});

export default ModularTextFieldAgenda;

import React, { forwardRef } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";

const ModularTextField = forwardRef((props, ref) => {
  const { label, placeholder, onChange } = props;

  return (
    <div className={styles.meetingBlockTextFieldHolder}>
      <p
        className={`${styles.meetingBlockTextFieldLabel} ${styles.meetingBlockTextFieldText}`}
      >
        {label}:
      </p>
      <input
        ref={ref}
        type="text"
        className={`${styles.meetingBlockTextField} ${styles.meetingBlockTextFieldText}`}
        placeholder={placeholder}
        onChange={onChange} // Ensure you pass the onChange handler here
      />
    </div>
  );
});

export default ModularTextField;

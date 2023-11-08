import React, { useRef, useEffect } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";

function ModularTextField(props) {
  const { label, placeholder, value, onChange, onBlur } = props;
  const textFieldRef = useRef(null);

  return (
    <div className={styles.meetingBlockTextFieldHolder}>
      <p
        className={`${styles.meetingBlockTextFieldLabel} ${styles.meetingBlockTextFieldText}`}
      >
        {label}:
      </p>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.meetingBlockTextField} ${styles.meetingBlockTextFieldText}`}
      ></textarea>
    </div>
  );
}

export default ModularTextField;

import React, { useRef, useEffect } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";

function ModularTextField(props) {
  const { label, placeholder, value, onChange, onBlur } = props;
  const textFieldRef = useRef(null);

  return (
    <div className={styles.textFieldHolder}>
      <p
        className={`${styles.textFieldLabel} ${styles.textFieldText}`}
        style={{ "font-size": "var(--psize)" }}
      >
        {label}:
      </p>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.textField} ${styles.textFieldText}`}
        style={{ "font-size": "var(--psize)" }}
      ></textarea>
    </div>
  );
}

export default ModularTextField;

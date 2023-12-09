import React, { forwardRef } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";

const ModularTextField = forwardRef((props, ref) => {
  const { label, placeholder, onChange, onBlur } = props;

  return (
    <div className={styles.detailBlockMain}>
      <p className={`${styles.detailBlockText}`}>{label}:</p>
      <input
        ref={ref}
        type="text"
        className={`${styles.detailBlockInput}`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
});

export default ModularTextField;

import React, { forwardRef } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";

const ModularTextFieldAgenda = forwardRef((props, ref) => {
  const { label, placeholder, onChange, onKeyDown } = props; // Include readOnly in props

  return (
    <div className={styles.agendaBlockTextFieldHolder}>
      {label && ( // Render label only if it exists
        <p className={`${styles.detailBlockText}`}>{label}:</p>
      )}
      <input
        ref={ref}
        type="text"
        className={`${styles.detailBlockInput}`}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
});

export default ModularTextFieldAgenda;

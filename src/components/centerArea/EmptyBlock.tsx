import React from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";

function EmptyBlock() {
  return (
    <div
      className={styles.genericBlock}
      style={{ marginTop: "var(--firstBlockMarginFromTop)" }}
    ></div>
  );
}

export default EmptyBlock;

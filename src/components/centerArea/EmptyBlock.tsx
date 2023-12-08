import React from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";

interface emptyBlockProps {
  showCover: boolean; // New prop for cover visibility
}

function EmptyBlock(props: emptyBlockProps) {
  return (
    <div className={styles.genericBlockHolder}>
      {props.showCover && <div className={styles.emptyBlockCover}></div>}
      <div
        className={styles.genericBlock}
        style={{ marginTop: "var(--firstBlockMarginFromTop)" }}
      ></div>
    </div>
  );
}

export default EmptyBlock;

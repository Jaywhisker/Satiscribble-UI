import React from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";

interface emptyBlockProps {
  showCover: boolean; // New prop for cover visibility, not in use cause there is nothing to cover
}

function EmptyBlock(props: emptyBlockProps) {
  return (
    <div className={styles.genericBlockHolder}>
      {/* {props.showCover && <div className={styles.emptyBlockCover}></div>} */}
      <div
        className={styles.genericBlock}
        style={{ marginTop: "var(--firstBlockMarginFromTop)" }}
      >
        <p className={styles.emptyBlockText}>
          Autosave is enabled. Any edits will be automatically saved.
        </p>
      </div>
    </div>
  );
}

export default EmptyBlock;

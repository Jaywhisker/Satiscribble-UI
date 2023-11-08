import React, { useState, useRef, useEffect } from "react";
import {
  isAbbreviation,
  adjustHeight,
  handleFocus,
  handleBlur,
} from "@/functions/helpers";
import styles from "@/styles/components/DynamicTextArea.module.css";

let typingTimer;

function DynamicTextarea({ id }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    const newValue = event.target.value;

    if (
      newValue.length > text.length &&
      (newValue[newValue.length - 1] === " " ||
        newValue[newValue.length - 1] === "\n")
    ) {
      const words = newValue.trim().split(" ");
      const lastWord = words[words.length - 1];
      console.log(`Last keyed-in word: ${lastWord}`);

      if (isAbbreviation(lastWord)) {
        console.log(`${lastWord} is an abbreviation.`);
      }
    }

    setText(newValue);
    adjustHeight(textareaRef);

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      console.log("stopped typing for 1 second");
    }, 1000);
  };

  useEffect(() => {
    adjustHeight(textareaRef);
  }, [text]);

  return (
    <div className={styles.container}>
      <h1 className={styles.containerHeader}>Some Header</h1>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        className={styles.textArea}
        onFocus={() => handleFocus(id)} // Added onFocus handler
        onBlur={() => handleBlur(id, textareaRef.current.value)} // Added onBlur handler
      ></textarea>
    </div>
  );
}

export default DynamicTextarea;

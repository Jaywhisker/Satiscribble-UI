import React, { useState, useRef, useEffect } from "react";
import {isAbbreviation, adjustHeight, setDefaultHeight } from "@/functions/centerArea/helpers";

import styles from "@/styles/components/DynamicTextArea.module.css";

let typingTimer;

function DynamicTextarea() {
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

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      console.log("stopped typing for 1 second");
    }, 1000);
  };

  useEffect(() => {
    adjustHeight(textareaRef);
  }, [text]);

  useEffect(() => {
    setDefaultHeight(textareaRef);
  }, []);

  return (
    <>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        className={styles.meetingBlockTextArea}
      ></textarea>
    </>
  );
}

export default DynamicTextarea;

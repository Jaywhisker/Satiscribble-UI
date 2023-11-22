// pages/index.js
import React, { useState, useRef, useEffect } from "react";
import MyEditor from "@/components/centerArea/MyEditor";
import dynamic from "next/dynamic";
import DynamicTextarea from "@/components/centerArea/DynamicTextArea";
import styles from "@/styles/components/DynamicTextArea.module.css";
import { handleFocus, handleBlur } from "@/functions/centerArea/helpers";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

function TextAreaQuill2({ id, shouldFocus }) {
  const [quillValue, setQuillValue] = useState("<ul><li><br></li></ul>");
  const [topic, setTopic] = useState("");
  const [quillActive, setQuillActive] = useState("");
  const topicRef = useRef(null);
  const quillRef = useRef();

  const handleTopicChange = (event) => {
    setTopic(event.target.value); // Update the topic state
  };

  useEffect(() => {
    // If shouldFocus is true, focus the topic input field
    if (shouldFocus && topicRef.current) {
      topicRef.current.focus();
    }
  }, [shouldFocus]);

  useEffect(() => {
    if (quillActive) {
      if (quillValue.endsWith("<br></li></ul>")) {
        console.log("enter/illegal delete was pressed?");
      }
      if (quillValue.endsWith("<p><br></p>")) {
        // If the content ends with <p><br></p>, append the <ul><li><br></li></ul>
        setQuillValue((currentValue) =>
          currentValue.replace(/<p><br><\/p>$/, "<ul><li><br></li></ul>")
        );
      }
    }
  }, [quillValue]);

  function handleChange(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      quillRef.current.focus();
    }
  }

  const handleQuillFocus = () => {
    handleFocus(id, setQuillActive, quillValue, setQuillValue); // Your existing focus logic

    // Set cursor position to the end of the editor content
    const quillEditor = quillRef.current.getEditor(); // Access the Quill editor instance
    const length = quillEditor.getLength(); // Get the length of the editor content
    quillEditor.setSelection(length, 0); // Set the cursor to the end
  };

  return (
    <div className={styles.container}>
      <input
        ref={topicRef}
        type="text"
        value={topic}
        placeholder="Enter Topic"
        onChange={handleTopicChange}
        onKeyPress={handleChange}
        className={`${styles.meetingBlockTextArea} ${styles.titleTextStyle}`}
      />

      <ReactQuill
        className={
          quillActive ? styles.activeQuillStyles : styles.inactiveQuillStyles
        }
        forwardedRef={quillRef}
        theme="bubble"
        value={quillValue}
        onChange={setQuillValue}
        onFocus={handleQuillFocus}
        onBlur={() => handleBlur(id, setQuillActive, quillValue, setQuillValue)} // Added onBlur handler
      />
    </div>
  );
}

export default TextAreaQuill2;

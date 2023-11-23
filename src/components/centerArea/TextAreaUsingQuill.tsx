// pages/index.js
import React, { useState, useRef, useEffect } from "react";
import MyEditor from "@/components/centerArea/MyEditor";
import DynamicTextarea from "@/components/centerArea/DynamicTextArea";
import styles from "@/styles/components/DynamicTextArea.module.css";

function TextAreaQuill({ id, shouldFocus }) {
  const [editorContent, setEditorContent] = useState("");
  const [topic, setTopic] = useState("");
  const editorRef = useRef(null);
  const topicRef = useRef(null);

  useEffect(() => {
    // If shouldFocus is true, focus the topic input field
    if (shouldFocus && topicRef.current) {
      topicRef.current.focus();
    }
  }, [shouldFocus]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Prevent the default Enter key action
      event.preventDefault();
      console.log("enter pressed");

      // Check if the editorRef and the editor within it are accessible
      if (editorRef.current && editorRef.current.getEditor) {
        // Focus the editor
        const editor = editorRef.current.getEditor();
        editor.focus();
      }
    }
  };

  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value); // Update the topic state
  };

  const handleSubmit = () => {
    console.log(editorContent);
    // You can send 'editorContent' to the backend here
  };

  return (
    <div className={styles.container}>
      {/* <DynamicTextarea /> */}
      <input
        ref={topicRef}
        type="text"
        value={topic}
        placeholder="Enter Topic"
        onChange={handleTopicChange}
        onKeyPress={handleKeyPress}
        className={`${styles.meetingBlockTextArea} ${styles.titleTextStyle}`}
      />
      {/* Reduce the amount of tab spacing */}
      <MyEditor onContentChange={handleContentChange} id={id} />
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
}

export default TextAreaQuill;

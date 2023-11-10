// pages/index.js
import React, { useState } from "react";
import MyEditor from "@/components/centerArea/ReactQuill";
import styles from "@/styles/components/DynamicTextArea.module.css";

function TextAreaQuill() {
  const [editorContent, setEditorContent] = useState("");

  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  const handleSubmit = () => {
    console.log(editorContent);
    // You can send 'editorContent' to the backend here
  };

  return (
    <div className={styles.container}>
      {/* Make this into a textarea so that topic title can be changed */}
      <h1 className={styles.blockHeader}>Topic</h1>
      {/* Reduce the amount of tab spacing */}
      <MyEditor onContentChange={handleContentChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default TextAreaQuill;

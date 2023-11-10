import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/components/DynamicTextArea.module.css";

// Since ReactQuill relies on the global document object, we need to import it dynamically
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// MyEditor component
function MyEditor({ onContentChange }) {
  const [value, setValue] = useState("");

  const handleChange = (content, delta, source, editor) => {
    setValue(editor.getHTML());
    if (onContentChange) {
      onContentChange(editor.getHTML()); // Call the passed callback function
    }
  };

  const modules = {
    toolbar: false, // This will hide the toolbar
  };

  const quillStyles = {
    ".ql-editor::before": {
      content: "attr(data-placeholder)",
      color: "#999", // Change this to your desired placeholder color
    },
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={modules}
      placeholder="Start typing here..."
      style={quillStyles}
      className={styles.meetingBlockTextFieldText}
    />
  );
}

export default MyEditor;

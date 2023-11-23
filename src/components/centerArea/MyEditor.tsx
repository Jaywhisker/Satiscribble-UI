import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/components/DynamicTextArea.module.css";

import { handleFocus, handleBlur } from "@/functions/centerArea/helpers";

// Since ReactQuill relies on the global document object, we need to import it dynamically
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// MyEditor component
function MyEditor({ onContentChange, id }) {
  const [value, setValue] = useState("<ul><li><br></li></ul>");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      if (value.endsWith("<br></li></ul>")) {
        console.log("enter/illegal delete was pressed?");
      }
      if (value.endsWith("<p><br></p>")) {
        // If the content ends with <p><br></p>, append the <ul><li><br></li></ul>
        setValue((currentValue) =>
          currentValue.replace(/<p><br><\/p>$/, "<ul><li><br></li></ul>")
        );
      }
    }
  }, [value]);

  const handleChange = (content, delta, source, editor) => {
    setValue(editor.getHTML());
    if (onContentChange) {
      onContentChange(editor.getHTML()); // Call the passed callback function
    }
  };

  const modules = {
    toolbar: false,
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={modules}
      placeholder="Start typing here..."
      className={active ? styles.activeQuillStyles : styles.inactiveQuillStyles}
      onFocus={() => handleFocus(id, setActive, value, setValue)} // Added onFocus handler
      onBlur={() => handleBlur(id, setActive, value, setValue)} // Added onBlur handler
    />
  );
}

export default MyEditor;

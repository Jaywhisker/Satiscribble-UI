// pages/index.js
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import DynamicTextarea from "@/components/centerArea/DynamicTextArea";
import styles from "@/styles/components/DynamicTextArea.module.css";
import {
  handleBlur,
  deltaToHTML,
  updateListItems,
  deltaToBackend,
} from "@/functions/centerArea/helpers";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

function TextAreaQuill({ id, shouldFocus }) {
  const [quillValue, setQuillValue] = useState("<ul><li></li></ul>");
  const [topic, setTopic] = useState("");
  const topicRef = useRef(null);
  const quillRef = useRef();

  const handleTopicChange = (event) => {
    setTopic(event.target.value); // Update the topic state
  };

  function handleChange(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      quillRef.current.focus();
    }
  }

  useEffect(() => {
    if (shouldFocus && topicRef.current) {
      topicRef.current.focus();
    }
  }, [shouldFocus]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const quillEditor = quillRef.current.getEditor();
      const rawText = quillEditor.getText();
      const backendDelta = deltaToBackend(rawText);
      console.log(backendDelta);
      const range = quillEditor.getSelection();
      if (range) {
        const contentUpToCursor = quillEditor.getContents(0, range.index);
        const processedDelta = deltaToHTML(contentUpToCursor);
        const { updatedProcessedDelta, lastQuillItemClass } = updateListItems(
          processedDelta,
          quillValue
        );
        // console.log(contentUpToCursor);
        // console.log("updatedProcessDelta :" + "\n" + updatedProcessedDelta);
        // console.log("quillvalue:" + "\n" + quillValue);
        const result = quillValue.replace(updatedProcessedDelta, "");
        // console.log(result);

        const previousCursorPosition = range.index;

        if (result.startsWith("</ul><p><br></p>")) {
          const indexOfSubstring =
            result.indexOf("</ul><p><br></p>") + "</ul><p><br></p>".length;
          let textAfter = result.substring(indexOfSubstring);
          if (textAfter.includes("<ul>") && textAfter.includes("</ul>")) {
            // Strip the <ul></ul> part from textAfter
            textAfter = textAfter.replace(/<ul>|<\/ul>/g, "").trim();
          }
          const classAttribute = lastQuillItemClass
            ? ` class="${lastQuillItemClass}"`
            : "";
          const newLiElements = `<li${classAttribute}><br></li><li${classAttribute}><br></li>`;
          // Currently Just chops off, need to slice off this part conditionally and readd
          setQuillValue(
            updatedProcessedDelta + newLiElements + textAfter + "</ul>"
          );
          setTimeout(() => {
            const quillEditor = quillRef.current.getEditor();
            const position = quillEditor.getLength();
            quillEditor.setSelection(previousCursorPosition + 1, 0);
          }, 0);
        } else if (result.startsWith("<p><br></p>")) {
          setQuillValue("<ul><li></li></ul>");
        }
      }
    }
    if (event.key === "Backspace") {
      // console.log("Backspace");
      const quillEditor = quillRef.current.getEditor();
      const range = quillEditor.getSelection();
      if (range && range.index !== 0) {
        const contentUpToCursor = quillEditor.getContents(0, range.index);
        // console.log(contentUpToCursor);
        const processedDelta = deltaToHTML(contentUpToCursor);
        // console.log(processedDelta);
        // console.log(quillValue);
        let { updatedProcessedDelta, lastQuillItemClass } = updateListItems(
          processedDelta,
          quillValue
        );
        const result = quillValue.replace(updatedProcessedDelta, "");
        // console.log(result);
        const previousCursorPosition = range.index;
        const pattern = /<\/ul><p>(.*?)<\/p>([\s\S]*)/;
        const match = result.match(pattern);
        if (result.startsWith("</ul><p><br></p>")) {
          const indexOfSubstring =
            result.indexOf("</ul><p><br></p>") + "</ul><p><br></p>".length;
          let textAfter = result.substring(indexOfSubstring);
          if (textAfter.includes("<ul>") && textAfter.includes("</ul>")) {
            // Strip the <ul></ul> part from textAfter
            textAfter = textAfter.replace(/<ul>|<\/ul>/g, "").trim();
          }
          setQuillValue(updatedProcessedDelta + textAfter + "</ul>");
          setTimeout(() => {
            const quillEditor = quillRef.current.getEditor();
            quillEditor.setSelection(previousCursorPosition, 0);
          }, 0);
        } else if (match) {
          //ie someone deleted a bullet point with tet there to move it up?
          const pContent = match[1]; // Content inside the <p> tag
          let remainingContent = match[2]; // Remaining content after the </p> tag
          if (
            remainingContent.includes("<ul>") &&
            remainingContent.includes("</ul>")
          ) {
            // Strip the <ul></ul> part from textAfter
            remainingContent = remainingContent
              .replace(/<ul>|<\/ul>/g, "")
              .trim();
          }
          const lastLiRegex =
            /(<li[^>]*>)(<br>|.*?)(<\/li>)(?![\s\S]*<li[^>]*>)/;
          const lastLiMatch = updatedProcessedDelta.match(lastLiRegex);

          if (lastLiMatch) {
            const updatedLi =
              lastLiMatch[1] +
              (lastLiMatch[2].trim() === "<br>" ? "" : lastLiMatch[2]) +
              pContent +
              lastLiMatch[3];
            updatedProcessedDelta = updatedProcessedDelta.replace(
              lastLiRegex,
              updatedLi
            );
          }

          // Find the last <li> before the pattern and concatenate the pContent
          setQuillValue(updatedProcessedDelta + remainingContent + "</ul>");
          setTimeout(() => {
            const quillEditor = quillRef.current.getEditor();
            quillEditor.setSelection(previousCursorPosition - 1, 0);
          }, 0);
        }
      }
    }
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
        className={styles.activeQuillStyles}
        forwardedRef={quillRef}
        theme="bubble"
        value={quillValue}
        onChange={setQuillValue} // Use the modified handler
        // onFocus={handleQuillFocus}
        onKeyDown={handleKeyDown} // Add the onKeyUp prop here
        onBlur={() => handleBlur(id, quillValue, setQuillValue)} // Added onBlur handler
      />
    </div>
  );
}

export default TextAreaQuill;

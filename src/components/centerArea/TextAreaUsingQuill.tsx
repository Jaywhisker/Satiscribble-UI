// pages/index.js
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
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
  const [quillDisplayed, setQuillDisplayed] = useState(true);
  const [quillValue, setQuillValue] = useState("<ul><li></li></ul>");
  const [topic, setTopic] = useState("");
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [summaryContent, setSummaryContent] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  );
  const topicRef = useRef(null);
  const quillRef = useRef();

  const toggleSummaryVisibility = () => {
    setIsSummaryVisible(true);
    setQuillDisplayed(false);
    // Some function to summarise and set summary Content
  };

  const toggleQuillVisibility = () => {
    setQuillDisplayed(!quillDisplayed);
  };

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
          let classAttribute = lastQuillItemClass
            ? ` class="${lastQuillItemClass}"`
            : "";
          let offset = 1;
          let newLiElements = "";
          if (classAttribute == "") {
            newLiElements = `<li${classAttribute}><br></li><li${classAttribute}><br></li>`;
          } else {
            newLiElements = `<li><br></li>`;
            offset = 0;
            // The unholy mess of trying to figure how to make it go down by one
            //  {
            //   let currentIndentLevel = classAttribute.match(/ql-indent-(\d+)/);
            //   let newIndentLevel = currentIndentLevel
            //     ? parseInt(currentIndentLevel[1], 10) - 1
            //     : 0;
            //   // Ensure that the indent level is not less than zero
            //   newIndentLevel = Math.max(newIndentLevel, 0);

            //   // Construct new class attribute with the decremented indent level
            //   classAttribute =
            //     newIndentLevel > 0
            //       ? ` class="ql-indent-${newIndentLevel}"`
            //       : "";

            //   if (newIndentLevel === 0) {
            //     // If indent level is 0, we don't need a class for indent
            //     newLiElements = `<li><br></li><li><br></li>`;
            //   } else {
            //     // Otherwise, add the updated classAttribute to the new elements
            //     newLiElements = `<li${classAttribute}><br></li>`;
            //   }
            // }
          }
          // Currently Just chops off, need to slice off this part conditionally and read
          const something =
            updatedProcessedDelta + newLiElements + textAfter + "</ul>";
          // console.log(something);
          setQuillValue(something);
          setTimeout(() => {
            const quillEditor = quillRef.current.getEditor();
            const position = quillEditor.getLength();
            quillEditor.setSelection(previousCursorPosition + offset, 0);
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
      if (range) {
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
        } else if (result.startsWith("<p><br></p>")) {
          setQuillValue("<ul><li></li></ul>");
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
    <div className={styles.genericBlock}>
      <input
        ref={topicRef}
        type="text"
        value={topic}
        placeholder="Enter Topic"
        onChange={handleTopicChange}
        onKeyPress={handleChange}
        className={`${styles.topicBlockTopicInput} ${styles.genericTitleText}`}
      />

      <div
        className={`${styles.topicBlockColumnContainer}`}
        style={{
          maxHeight: isSummaryVisible ? "10000px" : "0",
          transition: "max-height 1s ease-in-out, opacity 1s ease-in-out",
        }}
      >
        <button
          className={styles.topicBlockToggleSummaryButton}
          onClick={toggleQuillVisibility}
          style={{
            transform: quillDisplayed ? "rotate(90deg)" : "none",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <img src="/SummuriserArrow.svg" alt="Summarise" />
        </button>
        {/* Render the summary content here */}
        <p className={styles.topicBlockSummaryText}>{summaryContent}</p>
      </div>

      <div
        className={`${styles.topicBlockColumnContainer}`}
        style={{
          maxHeight: quillDisplayed ? "10000px" : "0",
          transition: "max-height 1s ease-in-out, opacity 1s ease-in-out",
        }}
      >
        <div className={styles.topicBlockReactQuillHolder}>
          <ReactQuill
            className={styles.genericPText}
            forwardedRef={quillRef}
            theme="bubble"
            value={quillValue}
            onChange={setQuillValue} // Use the modified handler
            // onFocus={handleQuillFocus}
            onKeyDown={handleKeyDown} // Add the onKeyUp prop here
            onBlur={() => handleBlur(id, quillValue, setQuillValue)} // Added onBlur handler
          />
        </div>
        <button
          onClick={toggleSummaryVisibility}
          className={styles.topicBlockSummariserButton}
        >
          <img src="/SummuriserButton.svg" alt="Summarise" />
        </button>
      </div>
    </div>
  );
}

export default TextAreaQuill;

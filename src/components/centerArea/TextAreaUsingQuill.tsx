// pages/index.js
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/components/DynamicTextArea.module.css";

import {
  handleBlur,
  deltaToHTML,
  updateListItems,
  deltaToBackend,
  detectLastAbbreviation,
} from "@/functions/centerArea/helpers";
import { updateMinutes } from "@/functions/api/updateMinutes";
import { summariseTopic } from "@/functions/api/topicActions";
import PopUp from "@/components/popup";
import { useToast } from "@/hooks/useToast";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

interface TextAreaQuillProps {
  minutesID: string;
  chatHistoryID: string;
  id: number;
  shouldFocus: boolean;
  title: string;
  updateTitle: (newTitle: string) => void;
  onDelete: () => void;
  onAddTopicArea: () => void;
  topicTitlesLength: number;
  content: string;
  updateBlockContent: (newContent: string) => void;
  showCover: boolean; // New prop for cover visibility
  setShowCover: (show: boolean) => void;
}

function TextAreaQuill(props: TextAreaQuillProps) {
  const [quillDisplayed, setQuillDisplayed] = useState(true);
  const [quillValue, setQuillValue] = useState("<ul><li></li></ul>");
  const [topic, setTopic] = useState("");

  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [summaryContent, setSummaryContent] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [tooLong, setTooLong] = useState(false);

  const [quillRefHeight, setQuillRefHeight] = useState(null);
  const [contentChanged, setContentChanged] = useState(false);

  const [agendaInaccuracyCounter, setAgendaInaccuracyCounter] = useState(0);
  const [topicInaccuracyCounter, setTopicInaccuracyCounter] = useState(0);

  const toast = useToast();

  const topicRef = useRef(null);
  const fullMinutesRef = useRef(null);
  const minutesRef = useRef(null);
  const quillRef = useRef();
  const prevTopicTitlesLength = useRef(props.topicTitlesLength);

  const toggleQuillVisibility = () => {
    setQuillDisplayed(!quillDisplayed);
  };

  const handleTopicChange = (event) => {
    const newTitle = event.target.value;
    setTopic(newTitle);
    props.updateTitle(newTitle); // Update the title in the parent component
  };

  function handleChange(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      quillRef.current.focus();
    }
  }

  useEffect(() => {
    setQuillValue(props.content);
  }, [props.content]);

  const handleQuillValueChange = (newValue) => {
    setQuillValue(newValue);
    props.updateBlockContent(newValue);
  };

  useEffect(() => {
    if (
      props.shouldFocus &&
      props.topicTitlesLength == prevTopicTitlesLength.current
    ) {
      topicRef.current.focus();
    }
    prevTopicTitlesLength.current = props.topicTitlesLength;
  }, [props.shouldFocus]);

  //animation logic for drop down -------------------------------------------------------------------------
  useEffect(() => {
    if (minutesRef.current) {
      var currentReactQuillHeight = minutesRef.current.clientHeight;
      if (currentReactQuillHeight > 0) {
        setQuillRefHeight(currentReactQuillHeight);
      }
    }
  }, [quillValue]);

  useEffect(() => {
    if (isSummaryVisible && fullMinutesRef.current) {
      if (quillDisplayed) {
        fullMinutesRef.current.style.transition = "height 0.75s ease-in-out";
        fullMinutesRef.current.style.height = `${quillRefHeight}px`;
        setTimeout(() => {
          fullMinutesRef.current.style.transition = "none";
          fullMinutesRef.current.style.height = "auto";
        }, 500);
      } else {
        fullMinutesRef.current.style.height = `${quillRefHeight}px`;
        setTimeout(() => {
          fullMinutesRef.current.style.transition = "height 0.75s ease-in-out";
          fullMinutesRef.current.style.height = "0px";
        }, 50);
      }
    }
  }, [isSummaryVisible, quillDisplayed]);

  const toggleSummaryVisibility = async () => {
    setIsSummaryVisible(true);
    setQuillDisplayed(false);
    setLoadingSummary(true);
    setSummaryContent("");
    await handleBlurring();
    var response = await summariseTopic(
      props.minutesID,
      props.chatHistoryID,
      String(props.id)
    );
    if (typeof response == "string") {
      setSummaryContent(response);
      setLoadingSummary(false);
    } else {
      console.log(typeof response);
      console.log("error summarising content");
    }
  };

  //handling updating of minutes ------------------------------
  useEffect(() => {
    setTopic(props.title);
  }, [props.title]);

  const handleBlurring = async () => {
    const quillEditor = quillRef.current.getEditor();
    const rawText = quillEditor.getText();
    const backendDelta = deltaToBackend(rawText);
    const lastAbbreviation = detectLastAbbreviation(backendDelta);
    handleBlur(
      props.id,
      backendDelta,
      quillValue,
      setQuillValue,
      props.minutesID,
      props.chatHistoryID
    );
    var response = await handleUpdateMinutes(backendDelta, lastAbbreviation);
  };

  const handleFocus = () => {
    setContentChanged(false);
    console.log("clicked in");
  };

  const handleUpdateMinutes = async (backendDelta, lastAbbreviation) => {
    if (contentChanged) {
      console.log("Content has been changed, updating");
      setContentChanged(false);
      var reqData = {
        minutesID: props.minutesID,
        chatHistoryID: props.chatHistoryID,
        abbreviation: lastAbbreviation,
        topicID: props.id,
        topicTitle: props.title,
        minutes: backendDelta,
      };

      var response = await updateMinutes(
        reqData,
        toast,
        agendaInaccuracyCounter,
        setAgendaInaccuracyCounter,
        topicInaccuracyCounter,
        setTopicInaccuracyCounter,
        props.onAddTopicArea
      );

      if (response !== undefined) {
        //handle error
        console.log("Minutes Update Error:", response.ERROR);
      }

      return response;
    } else {
      console.log("Content has not been changed");
    }
  };

  const handleKeyDown = async (event) => {
    if (contentChanged == false) {
      setContentChanged(true);
      console.log("Content in topic has been changed");
    }
    const quillEditor = quillRef.current.getEditor();
    const rawText = quillEditor.getText();
    console.log(rawText.length);
    if (rawText.length > 3000) {
      setTooLong(true);
      if (!tooLong) {
        toast.topicLength();
      }
    } else {
      setTooLong(false);
    }

    // console.log(event.key);
    if (event.ctrlKey && event.key === "Enter") {
      // console.log(props.content);
      props.onAddTopicArea();
    } else if (event.key === "Enter") {
      const backendDelta = deltaToBackend(rawText);
      const lastAbbreviation = detectLastAbbreviation(backendDelta);
      var response = await handleUpdateMinutes(backendDelta, lastAbbreviation);

      // console.log(backendDelta);
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
    } else if (event.key === "Backspace") {
      // console.log("Backspace");
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

  function handleDeleteButton() {
    if (props.title == "" && props.content == "<ul><li><br></li></ul>") {
      props.onDelete();
    } else {
      setDeleteMode(true);
      document.body.style.overflow = "hidden"; // Prevent scrolling
      props.setShowCover(true);
    }
  }

  function actualDeletefunction() {
    props.onDelete();
    document.body.style.overflow = "auto";
    props.setShowCover(false);
  }

  return (
    <div className={styles.topicBlockBigHolder}>
      {props.showCover && !deleteMode && (
        <div className={styles.genericBlockCover}></div>
      )}
      {deleteMode && (
        <div className={styles.topicBlockDeleteOverlay}>
          <PopUp.DeleteTopic
            isOpen={true}
            onClose={() => setDeleteMode(false)}
            onDelete={() => actualDeletefunction()}
          />
        </div>
      )}
      <div className={styles.genericBlock} id={`minuteID${props.id}`}>
        <div className={`${styles.topicBlockHeaderContainer}`}>
          <input
            ref={topicRef}
            type="text"
            value={topic}
            placeholder="Enter topic title here"
            onChange={handleTopicChange}
            onKeyPress={handleChange}
            className={`${styles.topicBlockTopicInput} ${styles.genericTitleText}`}
          />
          <button
            onClick={() => handleDeleteButton()}
            className={styles.topicBlockDeleteButton}
            title="Delete Minutes Block"
          >
            {/* <img src="/Trash.svg" alt="Trash" /> */}
            <svg
              className={styles.deleteIcon}
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.375 5.25H3.95833H16.625"
                stroke="#D1D1D1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.3335 5.25004V3.66671C6.3335 3.24678 6.50031 2.84405 6.79724 2.54712C7.09418 2.25019 7.4969 2.08337 7.91683 2.08337H11.0835C11.5034 2.08337 11.9061 2.25019 12.2031 2.54712C12.5 2.84405 12.6668 3.24678 12.6668 3.66671V5.25004M15.0418 5.25004V16.3334C15.0418 16.7533 14.875 17.156 14.5781 17.453C14.2811 17.7499 13.8784 17.9167 13.4585 17.9167H5.54183C5.1219 17.9167 4.71918 17.7499 4.42224 17.453C4.12531 17.156 3.9585 16.7533 3.9585 16.3334V5.25004H15.0418Z"
                stroke="#D1D1D1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.9165 9.20837V13.9584"
                stroke="#D1D1D1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.0835 9.20837V13.9584"
                stroke="#D1D1D1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${styles.topicBlockSummaryContainer}`}
          style={{ display: isSummaryVisible ? "flex" : "none" }}
        >
          <button
            className={
              styles.topicBlockTooooooooooooooooooooooooggleSummaryButton
            }
            onClick={toggleQuillVisibility}
            style={{
              transform: quillDisplayed ? "rotate(90deg)" : "none",
            }}
          >
            <img src="/SummuriserArrow.svg" alt="Summarise" title="Summarise" />
          </button>
          {/* Render the summary content here */}
          {summaryContent.length > 0 ? (
            <p className={styles.topicBlockSummaryText}>{summaryContent}</p>
          ) : (
            <p className={styles.topicBlockLoadingSummaryText}>
              Generating summary, please wait{" "}
            </p>
          )}
        </div>

        <div
          className={`${styles.topicBlockMinutesContainer}`}
          ref={fullMinutesRef}
        >
          <div className={styles.topicBlockReactQuillHolder} ref={minutesRef}>
            <ReactQuill
              className={styles.genericPText}
              forwardedRef={quillRef}
              theme="bubble"
              value={quillValue}
              onChange={handleQuillValueChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown} // Add the onKeyUp prop here
              onBlur={handleBlurring} // Added onBlur handler
            />
          </div>
          <button
            onClick={toggleSummaryVisibility}
            className={styles.topicBlockSummariserButton}
            disabled={loadingSummary}
            title={
              summaryContent.length > 0 ? "Regenerate Summary" : "Summarise"
            }
          >
            {loadingSummary ? (
              <div className={styles.loadingCursor}></div>
            ) : (
              <img src="/SummuriserButton.svg" alt="Summarise" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextAreaQuill;

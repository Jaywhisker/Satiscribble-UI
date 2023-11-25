import React, { useState, useEffect } from "react";
import MeetingDetailBlocks from "@/components/centerArea/MeetingDetailBlocks";
import TextAreaQuill from "@/components/centerArea/TextAreaUsingQuill";
import styles from "@/styles/components/DynamicTextArea.module.css";

function CenterArea() {
  const [topicAreas, setTopicareas] = useState([]);

  const handleAddTopicArea = () => {
    setTopicareas((prevTopicAreas) => [...prevTopicAreas, {}]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Control and Enter keys are pressed
      if (event.ctrlKey && event.key === "Enter") {
        handleAddTopicArea();
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.mainAreaContainer}>
      <MeetingDetailBlocks />
      {topicAreas.map((_, index) => (
        <TextAreaQuill
          key = {index}
          id={index}
          shouldFocus={index === topicAreas.length - 1}
        />
      ))}

      <button
        className={`${styles.mainAreaAddNewBlockButton}`}
        onClick={handleAddTopicArea}
      >
        <img src="/plus.svg" alt="add" />
        <p className={styles.genericTitleText}>New Block</p>
      </button>
    </div>
  );
}

export default CenterArea;

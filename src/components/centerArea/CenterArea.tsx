import React, { useState, useEffect } from "react";
import MeetingDetailBlocks from "@/components/centerArea/MeetingDetailBlocks";
import TextAreaQuill from "@/components/centerArea/TextAreaUsingQuill";
import EmptyBlock from "@/components/centerArea/EmptyBlock";
import styles from "@/styles/components/DynamicTextArea.module.css";

interface centerAreaProps {
  minutesID: string;
  chatHistoryID: string;
  topicTitles: any[];
  setTopicTitles: any;
}

function CenterArea(props: centerAreaProps) {
  const handleAddTopicArea = () => {
    props.setTopicTitles((prevTopicAreas) => [
      ...prevTopicAreas,
      { title: "" },
    ]);
  };

  const handleDeleteTopicArea = (index) => {
    props.setTopicTitles((currentAreas) =>
      currentAreas.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    console.log("Updated topicAreas:", props.topicTitles);
  }, [props.topicTitles]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Control and Enter keys are pressed
      if (event.ctrlKey && event.key === "Enter") {
        handleAddTopicArea();
        console.log(props.topicTitles);
      }
    };

    //   // Add event listener
    //   window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.mainAreaContainer}>
      <EmptyBlock />
      <MeetingDetailBlocks />
      {props.topicTitles.map((area, index) => (
        <TextAreaQuill
          key={index}
          id={index}
          shouldFocus={index === props.topicTitles.length - 1}
          title={area.title}
          updateTitle={(newTitle) => {
            props.setTopicTitles((currentAreas) => {
              const updatedAreas = [...currentAreas];
              updatedAreas[index].title = newTitle;
              return updatedAreas;
            });
          }}
          onDelete={() => handleDeleteTopicArea(index)}
          onAddTopicArea={handleAddTopicArea}
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

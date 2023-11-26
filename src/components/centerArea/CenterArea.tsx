import React, { useState, useEffect } from "react";
import MeetingDetailBlocks from "@/components/centerArea/MeetingDetailBlocks";
import TextAreaQuill from "@/components/centerArea/TextAreaUsingQuill";
import EmptyBlock from "@/components/centerArea/EmptyBlock";
import styles from "@/styles/components/DynamicTextArea.module.css";

function CenterArea() {
  const [topicAreas, setTopicareas] = useState([]);

  const handleAddTopicArea = () => {
    setTopicareas((prevTopicAreas) => [...prevTopicAreas, { title: "" }]);
  };

  const handleDeleteTopicArea = (index) => {
    setTopicareas((currentAreas) =>
      currentAreas.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    console.log("Updated topicAreas:", topicAreas);
  }, [topicAreas]);

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     // Check if Control and Enter keys are pressed
  //     if (event.ctrlKey && event.key === "Enter") {
  //       handleAddTopicArea();
  //       console.log(topicAreas);
  //     }
  //   };

  //   // Add event listener
  //   window.addEventListener("keydown", handleKeyDown);

  //   // Clean up event listener
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <div className={styles.mainAreaContainer}>
      <EmptyBlock />
      <MeetingDetailBlocks />
      {topicAreas.map((area, index) => (
        <TextAreaQuill
          key={index}
          id={index}
          shouldFocus={index === topicAreas.length - 1}
          title={area.title}
          updateTitle={(newTitle) => {
            setTopicareas((currentAreas) => {
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

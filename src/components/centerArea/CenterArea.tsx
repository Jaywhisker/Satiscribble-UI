import React, { useEffect } from "react";
import MeetingDetailBlocks from "@/components/centerArea/MeetingDetailBlocks";
import TextAreaQuill from "@/components/centerArea/TextAreaUsingQuill";
import EmptyBlock from "@/components/centerArea/EmptyBlock";
import styles from "@/styles/components/DynamicTextArea.module.css";

interface centerAreaProps {
  minutesID: string;
  chatHistoryID: string;
  topicTitles: any[];
  setTopicTitles: any;
  topicContent: any[];
  setTopicContent: any;
}

function CenterArea(props: centerAreaProps) {
  const handleAddTopicArea = () => {
    props.setTopicTitles((prevTopicAreas) => [
      ...prevTopicAreas,
      { title: "" },
    ]);
    props.setTopicContent((prevTopicContent) => [
      ...prevTopicContent,
      { content: "<ul><li></li></ul>" },
    ]);
  };

  function updateBlockContent(id, newContent) {
    props.setTopicContent((prevContent) => {
      return prevContent.map((content, idx) => {
        if (idx === id) {
          return { ...content, content: newContent };
        }
        return content;
      });
    });
  }

  const handleDeleteTopicArea = (index) => {
    props.setTopicTitles((currentAreas) =>
      currentAreas.filter((_, idx) => idx !== index)
    );
    props.setTopicContent((currentAreas) =>
      currentAreas.filter((_, idx) => idx !== index)
    );
  };

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
      <MeetingDetailBlocks
        minutesID={props.minutesID}
        chatHistoryID={props.chatHistoryID}
      />
      {props.topicTitles.map((area, index) => (
        <TextAreaQuill
          minutesID={props.minutesID}
          chatHistoryID={props.chatHistoryID}
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
          content={props.topicContent[index].content}
          updateBlockContent={(newContent) =>
            updateBlockContent(index, newContent)
          }
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

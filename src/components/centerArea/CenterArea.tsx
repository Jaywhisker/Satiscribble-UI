import React, { useEffect, useState } from "react";
import MeetingDetailBlocks from "@/components/centerArea/MeetingDetailBlocks";
import TextAreaQuill from "@/components/centerArea/TextAreaUsingQuill";
import EmptyBlock from "@/components/centerArea/EmptyBlock";
import styles from "@/styles/components/DynamicTextArea.module.css";
import { deleteTopic } from "@/functions/api/deleteTopic";
interface centerAreaProps {
  minutesID: string;
  chatHistoryID: string;
  topicTitles: any[];
  setTopicTitles: any;
  topicContent: any[];
  setTopicContent: any;
}

function CenterArea(props: centerAreaProps) {
  const [topicCount, setTopCount] = useState(0);

  const handleAddTopicArea = () => {
    props.setTopicTitles((prevTopicAreas) => [
      ...prevTopicAreas,
      { title: "", id: topicCount },
    ]);
    props.setTopicContent((prevTopicContent) => [
      ...prevTopicContent,
      { content: "<ul><li></li></ul>", id: topicCount },
    ]);
    setTopCount(topicCount + 1);
  };

  function updateBlockContent(id, newContent) {
    props.setTopicContent((prevContent) => {
      return prevContent.map((content) => {
        if (content.id === id) {
          return { ...content, content: newContent };
        }
        return content;
      });
    });
  }

  const handleDeleteTopicArea = (id) => {
    props.setTopicTitles((currentAreas) =>
      currentAreas.filter((topic) => topic.id !== id)
    );
    props.setTopicContent((currentAreas) =>
      currentAreas.filter((content) => content.id !== id)
    );
    deleteTopic(props.minutesID, props.chatHistoryID, id);
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
          key={area.id}
          id={area.id}
          shouldFocus={index === props.topicTitles.length - 1}
          title={area.title}
          updateTitle={(newTitle) => {
            props.setTopicTitles((currentAreas) => {
              const updatedAreas = [...currentAreas];
              updatedAreas[area.id].title = newTitle;
              return updatedAreas;
            });
          }}
          onDelete={() => handleDeleteTopicArea(area.id)}
          onAddTopicArea={handleAddTopicArea}
          content={props.topicContent[area.id].content}
          updateBlockContent={(newContent) =>
            updateBlockContent(area.id, newContent)
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

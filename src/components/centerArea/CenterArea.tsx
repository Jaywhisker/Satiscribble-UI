import React, { useEffect, useState } from "react";
import MeetingDetailBlocks from "@/components/centerArea/MeetingDetailBlocks";
import TextAreaQuill from "@/components/centerArea/TextAreaUsingQuill";
import EmptyBlock from "@/components/centerArea/EmptyBlock";

import styles from "@/styles/components/DynamicTextArea.module.css";

import { deleteTopic } from "@/functions/api/topicActions";
import AgendaBlock from "./AgendaBlocks";

interface centerAreaProps {
  minutesID: string;
  chatHistoryID: string;
  topicTitles: any[];
  setTopicTitles: any;
  topicContent: any[];
  setTopicContent: any;
  agendaContent: [{ id: string; name: string; completed: boolean }];
  setAgendaContent: any[];
}

function CenterArea(props: centerAreaProps) {
  const [topicCount, setTopCount] = useState(0);
  const [showCover, setShowCover] = useState(false);

  const handleAddTopicArea = () => {
    if (!showCover) {
      props.setTopicTitles((prevTopicAreas) => [
        ...prevTopicAreas,
        { title: "", id: topicCount },
      ]);
      props.setTopicContent((prevTopicContent) => [
        ...prevTopicContent,
        { content: "<ul><li></li></ul>", id: topicCount },
      ]);
      setTopCount(topicCount + 1);
    }
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

  const handleDeleteTopicArea = async (id) => {
    props.setTopicTitles((currentAreas) =>
      currentAreas.filter((topic) => topic.id !== id)
    );
    props.setTopicContent((currentAreas) =>
      currentAreas.filter((content) => content.id !== id)
    );
    var response = await deleteTopic(props.minutesID, props.chatHistoryID, id);
    if (response != undefined) {
      // call alert to showcase error
      console.log(response.ERROR);
    }
  };

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     // Check if Control and Enter keys are pressed
  //     if (event.ctrlKey && event.key === "Enter") {
  //       handleAddTopicArea();
  //       console.log(props.topicTitles);
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
      <EmptyBlock showCover={showCover} />
      <AgendaBlock
        agendaItems={props.agendaContent}
        setAgendaItems={props.setAgendaContent}
        minutesID={props.minutesID}
        chatHistoryID={props.chatHistoryID}
        showCover={showCover}
        setShowCover={setShowCover}
      />
      <MeetingDetailBlocks
        minutesID={props.minutesID}
        chatHistoryID={props.chatHistoryID}
        showCover={showCover}
        setShowCover={setShowCover}
      />
      {props.topicTitles.map((area, index) => (
        <TextAreaQuill
          minutesID={props.minutesID}
          chatHistoryID={props.chatHistoryID}
          key={index}
          id={area.id}
          shouldFocus={index === props.topicTitles.length - 1}
          title={area.title}
          updateTitle={(newTitle) => {
            props.setTopicTitles((currentAreas) => {
              const updatedAreas = [...currentAreas];
              updatedAreas[index].title = newTitle;
              return updatedAreas;
            });
          }}
          onDelete={() => handleDeleteTopicArea(area.id)}
          onAddTopicArea={handleAddTopicArea}
          content={props.topicContent[index].content}
          updateBlockContent={(newContent) =>
            updateBlockContent(area.id, newContent)
          }
          showCover={showCover}
          setShowCover={setShowCover}
        />
      ))}

      <div className={styles.genericBlockHolder}>
        {showCover && <div className={styles.genericBlockCover}></div>}
        <button
          className={styles.mainAreaAddNewBlockButton}
          onClick={handleAddTopicArea}
        >
          <img src="/plus.svg" alt="add" />
          <p className={styles.genericTitleText}>New Block</p>
        </button>
      </div>
    </div>
  );
}

export default CenterArea;

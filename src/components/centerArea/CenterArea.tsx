import React, { useEffect, useState } from "react";
import MeetingDetailBlocks from "@/components/centerArea/MeetingDetailBlocks";
import TextAreaQuill from "@/components/centerArea/TextAreaUsingQuill";
import EmptyBlock from "@/components/centerArea/EmptyBlock";

import styles from "@/styles/components/DynamicTextArea.module.css";

import { deleteTopic } from "@/functions/api/topicActions";
import AgendaBlock from "./AgendaBlocks";
import { useToast } from "@/hooks/useToast";

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
  const [topicCount, setTopCount] = useState(0); //Count on how many topic blocks have been created, count used for placeholders and indexing
  const [showCover, setShowCover] = useState(false); //prevent editing when there is a delete topic, toggled when the delete button of a filled up topic block has been clicked

  //Notification toasts (plugin in used for notifications)
  const toast = useToast();

  // ------------------------------------------------------------------------
  //
  //                        Upadter Functions
  //
  // ------------------------------------------------------------------------

  // Function that handles the creation of a new topic block
  const handleAddTopicArea = () => {
    // Checks that there is at least one agenda item in the agenda block
    var filledAgendaContent = props.agendaContent
      .map((agenda) => agenda.name)
      .filter((items) => items.trim() !== "");

    if (!showCover && filledAgendaContent.length > 0) {
      props.setTopicTitles((prevTopicAreas) => [
        ...prevTopicAreas,
        { title: "", id: topicCount, placeholder: `Topic ${topicCount + 1}` },
      ]);
      props.setTopicContent((prevTopicContent) => [
        ...prevTopicContent,
        { content: "<ul><li></li></ul>", id: topicCount },
      ]);
      setTopCount(topicCount + 1);
    } else if (filledAgendaContent.length <= 0) {
      toast.addTopicfail(false);
    }
  };

  // Function that handles updating the content of topic blcoks
  function updateBlockContent(id, newContent) {
    // Finds the content that  has the  same id as the block that is being updated and edits it
    props.setTopicContent((prevContent) => {
      return prevContent.map((content) => {
        if (content.id === id) {
          return { ...content, content: newContent };
        }
        return content;
      });
    });
  }

  // Function that handles the deleting of a topic area
  const handleDeleteTopicArea = async (id) => {
    props.setTopicTitles(
      (currentAreas) => currentAreas.filter((topic) => topic.id !== id) //Removing the title of the deleted block from the storage
    );
    props.setTopicContent(
      (currentAreas) => currentAreas.filter((content) => content.id !== id) //Removing the content of the deleted block from the storage
    );
    var response = await deleteTopic(props.minutesID, props.chatHistoryID, id);
    if (response != undefined) {
      console.log(response.ERROR);
    }
  };

  // Main Html
  return (
    <div className={styles.mainAreaContainer}>
      <EmptyBlock showCover={showCover} />
      <AgendaBlock
        agendaItems={props.agendaContent}
        setAgendaItems={props.setAgendaContent}
        topicContent={props.topicContent}
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
          key={area.id}
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

      <div
        className={styles.genericBlockHolder}
        style={{ marginBottom: "75vh" }}
      >
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

import React, { useState, useEffect } from "react";
import axios from "axios";

import LeftSidebar from "@/components/leftArea/leftSideBar";
import RightSideBar from "@/components/rightSideBar";
import CenterArea from "@/components/centerArea/CenterArea";

import { readID } from "@/functions/IDHelper";
export default function Home() {
  const [minutesID, setMinutesID] = useState(null);
  const [chatHistoryID, setChatHistoryID] = useState(null);

  const [topicTitles, setTopicTitles] = useState([]);
  const [topicContent, setTopicContent] = useState([]);
  const [agendaContent, setAgendaContent] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    console.log(topicContent, topicTitles);
  }, [topicContent]);

  useEffect(() => {
    console.log(topicTitles, topicContent);
  }, [topicTitles]);

  useEffect(() => {
    readID(setMinutesID, setChatHistoryID);
  }, []);

  useEffect(() => {
    if (selectedTask !== null) {
      var minutesElement = document.querySelector(
        `#minuteID${selectedTask}`
      ) as HTMLElement;
      minutesElement.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [selectedTask]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <LeftSidebar
        agendaContent={agendaContent}
        setAgendaContent={setAgendaContent}
        taskList={topicTitles}
        setSelectedTask={setSelectedTask}
      />

      <CenterArea
        minutesID={minutesID}
        chatHistoryID={chatHistoryID}
        topicTitles={topicTitles}
        setTopicTitles={setTopicTitles}
        topicContent={topicContent}
        setTopicContent={setTopicContent}
        agendaContent={agendaContent}
        setAgendaContent={setAgendaContent}
      />

      <RightSideBar
        minutesID={minutesID}
        chatHistoryID={chatHistoryID}
        topicTitles={topicTitles}
        setSelectedMinutes={setSelectedTask}
      />
    </div>
  );
}
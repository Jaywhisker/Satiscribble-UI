import React, { useState, useEffect, useRef } from "react";

import LeftSidebar from "@/components/leftArea/leftSideBar";
import RightSideBar from "@/components/rightArea/rightSideBar";
import CenterArea from "@/components/centerArea/CenterArea";

import { useToast } from "@/hooks/useToast";

import { readID } from "@/functions/IDHelper";

export default function Home() {
  const [minutesID, setMinutesID] = useState(null);
  const [chatHistoryID, setChatHistoryID] = useState(null);

  const [topicTitles, setTopicTitles] = useState([]);
  const [topicContent, setTopicContent] = useState([]);
  const [agendaContent, setAgendaContent] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);

  const toast = useToast();

  const inactivityTimeoutRef = useRef(null);
  const inactivityStatusRef = useRef("active");
  const timeout5MinTime = 5 * 60 * 1000;
  const timeout15MinTime = 15 * 60 * 1000;

  useEffect(() => {
    readID(setMinutesID, setChatHistoryID);
  }, []);

  //inactivity stuff  ----------------------------------------
  const resetInactivityTimeout = () => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    inactivityTimeoutRef.current = setTimeout(() => {
      if (inactivityStatusRef.current === "active") {
        toast.inactivity(false, inactivityStatusRef);
        inactivityStatusRef.current = "inactive";
      }
    }, timeout5MinTime);
  };

  useEffect(() => {
    const handleMouseMove = () => {
      resetInactivityTimeout();
    };
    const handleKeyPress = () => {
      resetInactivityTimeout();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keypress", handleKeyPress);

    resetInactivityTimeout();
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keypress", handleKeyPress);
      clearTimeout(inactivityTimeoutRef.current);
    };
  }, [timeout5MinTime]);

  useEffect(() => {
    if (inactivityStatusRef.current == "snooze") {
      setTimeout(() => {
        inactivityStatusRef.current = "active";
        console.log("snooze over");
        resetInactivityTimeout();
      }, timeout15MinTime);
    } else {
      resetInactivityTimeout();
    }
  }, [inactivityStatusRef.current]);

  useEffect(() => {
    //scroll to minutes
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

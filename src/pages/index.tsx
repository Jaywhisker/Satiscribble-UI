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

  useEffect(() => {
    readID(setMinutesID, setChatHistoryID);
  });

  // useEffect(() => {
  //   console.log(topicContent);
  // }, [topicContent]);

  // useEffect(() => {
  //   console.log(topicTitles);
  // }, [topicTitles]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <LeftSidebar/>

      <CenterArea
        minutesID={minutesID}
        chatHistoryID={chatHistoryID}
        topicTitles={topicTitles}
        setTopicTitles={setTopicTitles}
        topicContent={topicContent}
        setTopicContent={setTopicContent}
      />

      <RightSideBar
        minutesID={minutesID}
        chatHistoryID={chatHistoryID}
        topicTitles={topicTitles}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";

import RightSideBar from "@/components/rightSideBar";
import CenterArea from "@/components/centerArea/CenterArea";

import { readID} from "@/functions/IDHelper";
export default function Home() {

  const [minutesID, setMinutesID] = useState(null)
  const [chatHistoryID, setChatHistoryID] = useState(null)
  
  const [topicTitles, setTopicTitles] = useState(['Web Experiment','Frontend Development', 'Iteration Docs'])

  useEffect(() => {
    readID(setMinutesID, setChatHistoryID)
  })


  return (
    <div style={{display:"flex", "flex-direction": "row"}}>
      <div style={{display: "flex", "flex-direction": "column", width:'15vw', backgroundColor: 'black', height:'100vh'}}>
        <p>Left Hand Side</p>
      </div>
      
      <CenterArea/>
      
      <RightSideBar
        minutesID={minutesID}
        chatHistoryID={chatHistoryID}
        topicTitles={topicTitles}
      />
    </div>
  );
}

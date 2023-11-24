import React, { useState, useEffect } from "react";
import axios from "axios";

import MeetingDetailBlocks from "@/components/centerArea/MeetingDetailBlocks";
import TextAreaQuill from "@/components/centerArea/TextAreaUsingQuill";
import RightSideBar from "@/components/rightSideBar";

export default function Home() {
  const [name, setName] = useState(null);
  const [pythonMsg, setPythonMsg] = useState(null);
  
  const [topicAreas, setTopicareas] = useState([]);
  
  const handleAddTopicArea = () => {
    setTopicareas((prevTopicAreas) => [...prevTopicAreas, {}]);
  };

  return (
    <div style={{display:"flex", "flex-direction": "row"}}>
      <div style={{display: "flex", "flex-direction": "column", width:'15vw', backgroundColor: 'black', height:'100vh'}}>
        <p>Left Hand Side</p>
      </div>
      <div style={{ display: "flex", "flex-direction": "column", width:'60vw' }}>
          <MeetingDetailBlocks />
          {topicAreas.map((_, index) => (
            <TextAreaQuill
              id={index}
              key={index}
              shouldFocus={index === topicAreas.length - 1}
            />
          ))}
          <button onClick={handleAddTopicArea}>Add TopicArea</button>{" "}
      </div>

      <RightSideBar/>
    </div>
  );
}

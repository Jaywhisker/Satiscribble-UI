import React, { useState } from "react";
import MeetingDetailBlocks from "@/components/centerArea/MeetingDetailBlocks";
import TextAreaQuill from "@/components/centerArea/TextAreaUsingQuill";
import DynamicTextarea from "@/components/centerArea/DynamicTextArea";

function App() {
  const [topicAreas, setTopicareas] = useState([]);

  const handleAddTopicArea = () => {
    setTopicareas((prevTopicAreas) => [...prevTopicAreas, {}]);
  };

  return (
    <div style={{ display: "flex", "flex-direction": "column", gap: 20, width:'60vw' }}>
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
  );
}

export default App;

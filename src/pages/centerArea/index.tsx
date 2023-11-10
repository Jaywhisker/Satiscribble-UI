import React, { useState } from "react";
import DynamicTextarea from "@/components/centerArea/DynamicTextArea";
import MeetingDetailBlocks from "@/components/centerArea/MeetingDetailBlocks";
import TextAreaQuill from "@/components/centerArea/TextAreaUsingQuill";

function App() {
  const [textareas, setTextareas] = useState([{}]);

  const handleAddTextarea = () => {
    setTextareas((prevTextareas) => [...prevTextareas, {}]);
  };

  return (
    <div style={{ display: "flex", "flex-direction": "column", gap: 20 }}>
      {/* {textareas.map((_, index) => (
        <DynamicTextarea key={index} id={index} />
      ))}
      <button onClick={handleAddTextarea}>Add Textarea</button>{" "} */}
      <MeetingDetailBlocks />
      <TextAreaQuill />
    </div>
  );
}

export default App;

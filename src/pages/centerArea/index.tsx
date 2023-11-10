import React, { useState } from "react";
import DynamicTextarea from "@/components/DynamicTextArea";
import MeetingDetailBlocks from "@/components/MeetingDetailBlocks";
import TextAreaQuill from "@/components/TextAreaUsingQuill";

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

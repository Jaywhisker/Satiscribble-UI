import React, { useState, useEffect } from "react";
import axios from "axios";

// If the DynamicTextareaWithSend component is in a separate file, import it
// import DynamicTextareaWithSend from './path-to-component/DynamicTextareaWithSend';

// If the DynamicTextareaWithSend component is not in a separate file, define it here directly

const DynamicTextareaWithSend = () => {
  const [typedContent, setTypedContent] = useState("");

  useEffect(() => {
    async function getfield() {
      const response = await axios.post("/api/streaming", {
        responseType: "stream",
      });
      const stream = response.data;
      stream.on("data", (data) => {
        console.log(data);
      });

      stream.on("end", () => {
        console.log("stream done");
      });
    }
    getfield();
  }, []);

  return (
    <div>
      <textarea value={typedContent} />
    </div>
  );
};

const Home = () => {
  // You can pass a unique ID if you plan to have multiple instances of this component
  const textareaId = 1;

  return (
    <div>
      <p>Testing page works!</p>
      {/* Render the DynamicTextareaWithSend component and pass the id prop */}
      <DynamicTextareaWithSend />
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";
import ModularTextField from "@/components/ModularTextField";

function MeetingDetailBlocks() {
  // States for each text field value
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [participants, setParticipants] = useState("");
  const [location, setLocation] = useState("");
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);

  // Handle text change for each text field
  const handleDateChange = (e) => {
    setDate(e.target.value);
    setIsTextFieldFocused(true);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
    setIsTextFieldFocused(true);
  };
  const handleParticipantsChange = (e) => {
    setParticipants(e.target.value);
    setIsTextFieldFocused(true);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setIsTextFieldFocused(true);
  };

  const handleContainerBlur = () => {
    // Make API call when the container loses focus and a text field was edited
    if (isTextFieldFocused) {
      console.log("API call triggered");
      // Perform your API call logic here
    }
    setIsTextFieldFocused(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleContainerBlur);
    return () => {
      document.removeEventListener("click", handleContainerBlur);
    };
  }, [isTextFieldFocused]);

  return (
    <div className={styles.container}>
      <h1 style={{ "font-size": "var(--headersize)", "font-family": "Lato" }}>
        Meeting Details
      </h1>
      <ModularTextField
        label="Date"
        placeholder="Enter date here"
        value={date}
        onChange={handleDateChange}
      />
      <ModularTextField
        label="Time"
        placeholder="Enter time here"
        value={time}
        onChange={handleTimeChange}
      />
      <ModularTextField
        label="Participants"
        placeholder="Enter participants here"
        value={participants}
        onChange={handleParticipantsChange}
      />
      <ModularTextField
        label="Location"
        placeholder="Enter location here"
        value={location}
        onChange={handleLocationChange}
      />
    </div>
  );
}

export default MeetingDetailBlocks;

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";
import ModularTextField from "@/components/ModularTextField";

function MeetingDetailBlocks() {
  const containerRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  // The useRef Hook to reference each text field
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const participantsRef = useRef(null);
  const locationRef = useRef(null);

  const handleInputChange = () => {
    // Called on text field change
    setIsEditing(true);
  };

  const handleContainerClick = (e) => {
    // If a click is within the container, do nothing
    if (containerRef.current && containerRef.current.contains(e.target)) {
      return;
    }

    // If the user has edited a field and clicks outside the container, fetch values and call the API
    if (isEditing) {
      const dateValue = dateRef.current.value;
      const timeValue = timeRef.current.value;
      const participantsValue = participantsRef.current.value;
      const locationValue = locationRef.current.value;

      console.log("API call triggered");
      console.log("Date: " + dateValue);
      console.log("Time: " + timeValue);
      console.log("Participants: " + participantsValue);
      console.log("Location: " + locationValue);

      // Perform your API call logic here or any other logic needed

      setIsEditing(false); // Reset the editing flag
    }
  };

  useEffect(() => {
    // Bind the event listener to the document
    document.addEventListener("mousedown", handleContainerClick);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleContainerClick);
    };
  }, [isEditing]); // Dependency array now includes `isEditing`

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.blockHeader}>Meeting Details</h1>
      <ModularTextField
        label="Date"
        placeholder="Enter date here"
        ref={dateRef}
        onChange={handleInputChange}
      />
      <ModularTextField
        label="Time"
        placeholder="Enter time here"
        ref={timeRef}
        onChange={handleInputChange}
      />
      <ModularTextField
        label="Participants"
        placeholder="Enter participants here"
        ref={participantsRef}
        onChange={handleInputChange}
      />
      <ModularTextField
        label="Location"
        placeholder="Enter location here"
        ref={locationRef}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default MeetingDetailBlocks;

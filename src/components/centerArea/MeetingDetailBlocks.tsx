import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";
import ModularTextField from "@/components/centerArea/ModularTextField";

function MeetingDetailBlocks() {
  const containerRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const participantsRef = useRef(null);
  const locationRef = useRef(null);

  const handleInputChange = () => {
    setIsEditing(true);
  };

  const handleContainerClick = (e) => {
    if (containerRef.current && containerRef.current.contains(e.target)) {
      return;
    }

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

      setIsEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleContainerClick);

    return () => {
      document.removeEventListener("mousedown", handleContainerClick);
    };
  }, [isEditing]);

  return (
    <div ref={containerRef} className={styles.genericBlock}>
      <p className={styles.genericTitleText}>Meeting Details</p>
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

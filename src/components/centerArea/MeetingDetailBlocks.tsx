import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";
import ModularTextField from "@/components/centerArea/ModularTextField";
import { updateMeetingDetails } from "@/functions/api/updateMinutes";
import { useToast } from "@/hooks/useToast";

interface meetingDetailBlockProps {
  minutesID: string;
  chatHistoryID: string;
  showCover: boolean; // New prop for cover visibility
  setShowCover: (show: boolean) => void;
}

function MeetingDetailBlocks(props: meetingDetailBlockProps) {
  const containerRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [meetingFocused, setMeetingFocused] = useState(false);

  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const participantsRef = useRef(null);
  const locationRef = useRef(null);

  const toast = useToast()


  useEffect(() => {
      // check if there is a meetingDetails alert fail
      var meetingDetailsFailedAlert = toast.alertContainer.filter(
        (alert) => alert.type === "meetingSaveFail" && alert.stateValue == false
      )
      if (meetingDetailsFailedAlert.length > 0) {
        //if there is an error and meeting minutes in focus, remove alert
        if (meetingFocused) {
          toast.update(meetingDetailsFailedAlert[0].id, "meetingSaveFail", null, null, true)
        }
      }
  }, [toast.alertContainer, meetingFocused])


  const handleInputChange = () => {
    setIsEditing(true);
  };


  const handleContainerClick = async (e) => {
    if (containerRef.current && containerRef.current.contains(e.target)) {
      //reference the error container at time of addEventListener...HELPS
      setMeetingFocused(true)
      return;
    }
    if (isEditing && meetingFocused) {
      const dateValue = dateRef.current.value;
      const timeValue = timeRef.current.value;
      const participantsValue = participantsRef.current.value;
      const locationValue = locationRef.current.value;
      setMeetingFocused(false)

      // console.log("API call triggered");
      // console.log("Date: " + dateValue);
      // console.log("Time: " + timeValue);
      // console.log("Participants: " + participantsValue);
      // console.log("Location: " + locationValue);

      var response = await updateMeetingDetails(
        props.minutesID,
        props.chatHistoryID,
        locationValue,
        participantsValue
      );
      if (response !== undefined) {
        //handle error
        console.log("Meeting Details Error:", response.ERROR);
        toast.meetingSaveFail({'location': locationValue, 'participants': participantsValue}, false, toast)
      } else {
        setIsEditing(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleContainerClick);

    return () => {
      document.removeEventListener("mousedown", handleContainerClick);
    };
  }, [isEditing, meetingFocused]);


  return (
    <div className={styles.genericBlockHolder}>
      {props.showCover && <div className={styles.genericBlockCover}></div>}
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
    </div>
  );
}

export default MeetingDetailBlocks;

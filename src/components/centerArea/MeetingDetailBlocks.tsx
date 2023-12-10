import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/DynamicTextArea.module.css";
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
  const listRef = [dateRef, timeRef, participantsRef, locationRef];

  const toast = useToast();

  useEffect(() => {
    // check if there is a meetingDetails alert fail
    var meetingDetailsFailedAlert = toast.alertContainer.filter(
      (alert) => alert.type === "meetingSaveFail" && alert.stateValue == false
    );
    if (meetingDetailsFailedAlert.length > 0) {
      //if there is an error and meeting minutes in focus, remove alert
      if (meetingFocused) {
        toast.update(
          meetingDetailsFailedAlert[0].id,
          "meetingSaveFail",
          null,
          null,
          true
        );
      }
    }
  }, [toast.alertContainer, meetingFocused]);

  const handleInputChange = () => {
    setIsEditing(true);
  };

  const handleContainerClick = async (e) => {
    if (containerRef.current && containerRef.current.contains(e.target)) {
      //reference the error container at time of addEventListener...HELPS
      setMeetingFocused(true);
      return;
    }
    if (isEditing && meetingFocused) {
      const dateValue = dateRef.current.value;
      const timeValue = timeRef.current.value;
      const participantsValue = participantsRef.current.value;
      const locationValue = locationRef.current.value;
      setMeetingFocused(false);

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
        toast.meetingSaveFail(
          { location: locationValue, participants: participantsValue },
          false,
          toast
        );
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

  function handleKeyDown(e, index) {
    if (e.key == "ArrowDown") {
      e.preventDefault();
      listRef[(index + 1) % 4].current.focus();
    } else if (e.key == "ArrowUp") {
      e.preventDefault();
      if (index == 0) {
        listRef[3].current.focus();
      } else {
        listRef[(index - 1) % 4].current.focus();
      }
    }
  }

  return (
    <div className={styles.genericBlockHolder}>
      {props.showCover && <div className={styles.genericBlockCover}></div>}
      <div ref={containerRef} className={styles.genericBlock}>
        <p className={styles.genericTitleText}>Meeting Details</p>

        <div className={styles.detailBlockMain}>
          <p className={`${styles.detailBlockText}`}>{"Date"}:</p>
          <input
            ref={dateRef}
            type="text"
            className={`${styles.detailBlockInput}`}
            placeholder={"Enter date here"}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 0)}
          />
        </div>
        <div className={styles.detailBlockMain}>
          <p className={`${styles.detailBlockText}`}>{"Time"}:</p>
          <input
            ref={timeRef}
            type="text"
            className={`${styles.detailBlockInput}`}
            placeholder={"Enter time here"}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 1)}
          />
        </div>
        <div className={styles.detailBlockMain}>
          <p className={`${styles.detailBlockText}`}>{"Participants"}:</p>
          <input
            ref={participantsRef}
            type="text"
            className={`${styles.detailBlockInput}`}
            placeholder={"Enter participants here"}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 2)}
          />
        </div>
        <div className={styles.detailBlockMain}>
          <p className={`${styles.detailBlockText}`}>{"Location"}:</p>
          <input
            ref={locationRef}
            type="text"
            className={`${styles.detailBlockInput}`}
            placeholder={"Enter location here"}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 3)}
          />
        </div>
      </div>
    </div>
  );
}

export default MeetingDetailBlocks;

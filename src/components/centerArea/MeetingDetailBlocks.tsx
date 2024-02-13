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
  const [isEditing, setIsEditing] = useState(false); //Used to check if the contents in the Meeting Details block has changed
  const [meetingFocused, setMeetingFocused] = useState(false);

  //Reference Containers
  const containerRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const participantsRef = useRef(null);
  const locationRef = useRef(null);
  const listRef = [dateRef, timeRef, participantsRef, locationRef];

  //Notification toasts
  const toast = useToast();

  // ------------------------------------------------------------------------
  //
  //                        Updater Functions
  //
  // ------------------------------------------------------------------------

  // Helper function that sets isEditing to true when contents change
  const handleInputChange = () => {
    setIsEditing(true);
  };

  // Function that handles mouse clicks which decides when to update the meeting details backend
  const handleContainerClick = async (e) => {
    // If one of the input areas were clicked
    if (containerRef.current && containerRef.current.contains(e.target)) {
      setMeetingFocused(true);
      return;
    }
    // If meetingFocused (from mouse click) and content has changed
    if (isEditing && meetingFocused) {
      // Data from the respective fields
      // Date and time are not used  in the update info due to formating
      const dateValue = dateRef.current.value;
      const timeValue = timeRef.current.value;
      const participantsValue = participantsRef.current.value;
      const locationValue = locationRef.current.value;

      // calls the update Meeting Details api to update the backend
      var response = await updateMeetingDetails(
        props.minutesID,
        props.chatHistoryID,
        locationValue,
        participantsValue
      );
      if (response !== undefined) {
        console.log("Meeting Details Error:", response.ERROR); // Sends console log if fail to update
        toast.meetingSaveFail(false, {
          location: locationValue,
          participants: participantsValue,
        }); //pushes toast notification on failure to update
      } else {
        setIsEditing(false);
        setMeetingFocused(false);
        // Put a console.log here if you want to ensure that the function is working
      }
    }
  };

  // Function that allows for up and down to switch between the input areas
  // Basically each area has an index and just uses that index that cycle
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

  // Adds the mouse down listner to the document, making use of the function above
  useEffect(() => {
    document.addEventListener("mousedown", handleContainerClick);

    return () => {
      document.removeEventListener("mousedown", handleContainerClick);
    };
  }, [isEditing, meetingFocused]);

  // Function that handles alerts
  // If there is an error with updating the meeting details and the blcok is clicked
  // Reomove the function
  useEffect(() => {
    // check if there is a meetingDetails alert fail
    var meetingDetailsFailedAlert = toast.alertContainer.filter(
      (alert) => alert.type === "meetingSaveFail" && alert.stateValue == false
    );
    if (meetingDetailsFailedAlert.length > 0) {
      //if there is an error and meeting minutes in focus, remove alert
      if (meetingFocused) {
        toast.update(meetingDetailsFailedAlert[0].id, "meetingSaveFail", true);
      }
    }
  }, [toast.alertContainer, meetingFocused]);

  //HTML
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

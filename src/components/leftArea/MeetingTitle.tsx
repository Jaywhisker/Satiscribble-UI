import React from "react";
import outline from "@/styles/components/leftSideBar/leftSideBar.module.css";

// Temporary container component
// Main aim is to be the meeting minutes title 
// Can either be the date or make it a user input
interface MeetingTitleProps {
  text: string;
}

const MeetingTitle: React.FC<MeetingTitleProps> = ({ text }) => {
  return (
    <div className={outline['outline-meetingTitle']}>
      <p>{text}</p>
    </div>
  );
};

export default MeetingTitle;



// If we only want to accept the subject and date as props

//interface MeetingTitleProps {
//title: string;
//date: string;
//}

//const MeetingTitle: React.FC<MeetingTitleProps> = ({ title, date }) => {
//return (
//<div className={styles.wrapper}>
//<div className={styles.styledContainer}>
//{title} MEETING ON {date}
//</div>
//</div>
//);
//};

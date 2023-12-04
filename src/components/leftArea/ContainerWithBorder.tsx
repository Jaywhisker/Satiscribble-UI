import React from "react";
import styles from "@/styles/components/leftSideBar.module.css";

// Temporary container component, will require one that retrives title and date

interface ContainerWithBorderProps {
  text: string;
}

const ContainerWithBorder: React.FC<ContainerWithBorderProps> = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <p>{text}</p>
    </div>
  );
};

export default ContainerWithBorder;

// If we only want to accept the subject and date as props

//interface ContainerWithBorderProps {
//title: string;
//date: string;
//}

//const ContainerWithBorder: React.FC<ContainerWithBorderProps> = ({ title, date }) => {
//return (
//<div className={styles.wrapper}>
//<div className={styles.styledContainer}>
//{title} MEETING ON {date}
//</div>
//</div>
//);
//};

import React from "react";

import Agenda from "@/components/leftArea/Agenda";
import Outline from "@/components/leftArea/Outline";
import MeetingTitle from "./MeetingTitle";

import LeftBar from "@/styles/components/leftSideBar/leftSideBar.module.css";

interface LeftSideProps {
  agendaContent: [{ id: number; name: string; completed: boolean }];
  setAgendaContent: any;
  topicTitleList: [{ title: string; id: number, placeholder:string }];
  setFocusedTopic: any;
}


export default function LeftSideBar(props: LeftSideProps) {
  return (
    <div className={LeftBar['lbs-mainContainer']}>
      <MeetingTitle text="Satiscribble" />
      <Agenda
        agendaList={props.agendaContent}
        setAgendaList={props.setAgendaContent}
      />
      <Outline
        topicTitleList={props.topicTitleList}
        setFocusedTopic={props.setFocusedTopic}
      />
    </div>
  );
}


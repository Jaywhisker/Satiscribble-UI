import React from 'react';
import Agenda from './Agenda';
import Outline from './Outline';
import ContainerWithBorder from './ContainerWithBorder';

import LeftBar from '@/styles/components/leftSideBar.module.css'

interface LeftSideProps{
  agendaContent: [{id:number, name:string, completed:boolean}]
  setAgendaContent: any
  taskList: [{title:string, id:number}]
  setSelectedTask: any
}

export default function LeftSideBar(props: LeftSideProps) {

    return (
      <div className={LeftBar.leftBarContainer}>
        <ContainerWithBorder text="HCI MEETING ON 23/10" /> 
        <Agenda 
          agendaList={props.agendaContent}
          setAgendaList={props.setAgendaContent}
        />
        <div style={{ width: '100%', marginTop: '20px' }}>
        <Outline 
          taskList={props.taskList}
          setSelectedTask={props.setSelectedTask}/>
        </div>
      </div>
    );

 }




// We can also pass just the subject and the date if we want to
// Provided we make the necessary changes to ContainerWithBorder.tsx
// <ContainerWithBorder title="HCI" date="23/10" />


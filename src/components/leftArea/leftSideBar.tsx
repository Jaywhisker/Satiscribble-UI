import React from 'react';
import Agenda from './Agenda';
import Outline from './Outline';
import ContainerWithBorder from './ContainerWithBorder';

import LeftBar from '@/styles/components/leftSideBar.module.css'


export default function LeftSideBar() {

    return (
      <div className={LeftBar.leftBarContainer}>
        <ContainerWithBorder text="HCI MEETING ON 23/10" /> 
        <Agenda />
        <div style={{ width: '100%', marginTop: '20px' }}>
        <Outline />
        </div>
      </div>
    );

 }




// We can also pass just the subject and the date if we want to
// Provided we make the necessary changes to ContainerWithBorder.tsx
// <ContainerWithBorder title="HCI" date="23/10" />


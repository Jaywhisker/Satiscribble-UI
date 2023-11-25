import React, { useState, useEffect } from "react";
import axios from "axios";

import MeetingDetailBlocks from "@/components/centerArea/MeetingDetailBlocks";
import TextAreaQuill from "@/components/centerArea/TextAreaUsingQuill";
import RightSideBar from "@/components/rightSideBar";
import CenterArea from "@/components/centerArea/CenterArea";

export default function Home() {

  

  return (
    <div style={{display:"flex", "flex-direction": "row"}}>
      <div style={{display: "flex", "flex-direction": "column", width:'15vw', backgroundColor: 'black', height:'100vh'}}>
        <p>Left Hand Side</p>
      </div>
      <CenterArea/>
      <RightSideBar/>
    </div>
  );
}

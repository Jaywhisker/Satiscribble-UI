import React from "react";
import notificationsStyle from "@/styles/components/notificationsOverlay.module.css";
import { Button } from "@/components/buttons";
import PopUp from "@/components/popup";

function Overlay() {
  return (
    <div className={notificationsStyle.overallContainer}>
      <PopUp.InactivityAlert isOpen={true} onClose={() => {}} />
      <PopUp.InactivityAlert isOpen={true} onClose={() => {}} />
    </div>
  );
}

export default Overlay;

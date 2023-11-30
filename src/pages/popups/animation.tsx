import React, { useState } from 'react';
import NotificationContainer from '@/components/popup/NotificationContainer';
import AnimationPopup from '@/components/popup/AnimationPopup';
import * as PopUp from '@/components/popup';
import { Button } from '@/components/buttons';

const PopupsPage: React.FC = () => {
  const [addPopupFunction, setAddPopupFunction] = useState<(popup: React.ReactNode) => void | null>(() => null);

  const handleAddPopup = () => {
    if (addPopupFunction) {
      // Example: Adding a random PopUp on button click
      const randomPopUpIndex = Math.floor(Math.random() * Object.keys(PopUp).length);
      const randomPopUpKey = Object.keys(PopUp)[randomPopUpIndex];
      const randomPopUpComponent = PopUp[randomPopUpKey]; // Get the corresponding component

      const popup = (
        <AnimationPopup isOpen={true} onClose={() => {}}>
          {React.createElement(randomPopUpComponent, { isOpen: true, onClose: () => {} })}
        </AnimationPopup>
      );

      // Set the addPopupFunction with the popup component
      setAddPopupFunction((prevAddPopupFunction) => () => {
        prevAddPopupFunction && prevAddPopupFunction(popup);
        addPopupFunction(popup); // Add the popup to the NotificationContainer
      });
    }
  };

  return (
    <div>
      <Button size="medium" fillBorderVariant="border" onClick={handleAddPopup}>Add New Popup</Button>
      <NotificationContainer addPopup={addPopupFunction}>
        {/* You can pass any children to NotificationContainer */}
      </NotificationContainer>
    </div>
  );
};

export default PopupsPage;

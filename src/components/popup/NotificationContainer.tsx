import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import * as PopUp from '@/components/popup';

interface NotificationContainerProps {
  children: React.ReactNode;
  addPopup: (popup: React.ReactNode) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ children, addPopup }) => {
  const [popups, setPopups] = useState<React.ReactElement[]>([]);

  // Define the slide-in animation for popups using react-spring
  const slideInAnimation = useSpring({
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0%)' },
    delay: 200, // Add a slight delay to avoid jarring transitions
    config: {
      duration: 400, // Set the animation duration
      easing: 'ease-out-cubic', // Use a smooth easing function
    },
  });

  const handleAddPopup = (popup: React.ReactElement) => {
    // Check if adding a new popup will exceed the maximum height
    const totalHeight = popups.reduce((acc, curr) => acc + 384, 0); // Calculate total height of existing popups
    if (totalHeight + 384 <= window.innerHeight) {
      // If there's enough space, add the new popup
      setPopups([...popups, popup]);
    } else {
      // If exceeding max height, remove the oldest popup and add the new one
      setPopups([...popups.slice(1), popup]);
    }
  };

  return (
    <div>
      {popups.map((popup, index) => (
        <animated.div key={index} style={slideInAnimation}>
          {popup}
        </animated.div>
      ))}
      {/* Pass the addPopup function to child components */}
      {children && React.cloneElement(children as React.ReactElement, { addPopup })}
    </div>
  );
};

export default NotificationContainer;

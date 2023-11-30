import React from 'react';
import { useSpring, animated } from 'react-spring';

interface AnimationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AnimationPopup: React.FC<AnimationPopupProps> = ({ isOpen, onClose, children }) => {
  // Define the slide-in/out animation for the popup using react-spring
  const slideInOutAnimation = useSpring({
    transform: isOpen ? 'translateX(0%)' : 'translateX(-100%)',
    delay: 0, // No delay for slide-out animation
    config: {
      duration: 300, // Slightly faster slide-out animation
      easing: 'ease-in-cubic', // Smooth slide-out animation
    },
  });

  return (
    <animated.div style={slideInOutAnimation}>
      {React.cloneElement(children as React.ReactElement, { onClose })}
    </animated.div>
  );
};

export default AnimationPopup;

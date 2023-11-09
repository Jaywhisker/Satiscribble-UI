import React from 'react';

interface Popup1Props {
  onClose: () => void;
}

const Popup1: React.FC<Popup1Props> = ({ onClose }) => {
  return (
    <div className="popup">
      <h2>Popup 1</h2>
      {/* Add your content and styling here */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Popup1;
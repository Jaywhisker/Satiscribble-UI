import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
  padding-left: 18px;
  padding-right: 18px;
`;

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  background-color: var(--Dark_Grey);
  color: var(--Nice_Blue);
  cursor: pointer;
  font-size: 16px;
  border-bottom: 2px solid var(--Nice_Blue);
  position: relative; // Position relative for absolute positioning of the image

  p {
    margin: 0;
    line-height: 1;
  }

  // Styles for the image
  img {
    position: absolute;
    right: 0px; 
    height: 100%;
    transition: transform 0.3s ease;
`;

const DropdownContent = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  background-color: var(--Grey);
  
  padding: 0 12px;
  box-sizing: border-box; // Include padding and border in width
  margin: 0; // Remove any margin
`;

const DropdownOption = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0; // Adjust padding for top and bottom only
  background-color: var(--Grey);
  color: var(--Pure_White);
  cursor: pointer;
 
  box-sizing: border-box; // Include padding in the width

  // Add this to remove default margins from p tags
  p {
    margin: 0;
    line-height: 1; // Adjust line-height as needed for your design
  }
`;

function Outline() {
  const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4'];
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(tasks[0]); // state for the selected task

  const toggleDropDown = () => {
    setDropDownOpen(prev => !prev);
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task); // Update the selected task
    setDropDownOpen(false); // Close the dropdown menu
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropDown}>
        <p><b>Outline</b></p>
        <img 
          src="/Dropdown.png" 
          alt="Toggle Dropdown"
          style={{ transform: dropDownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} // Keep the rotation style inline
        />
      </DropdownButton>
      <DropdownContent open={dropDownOpen}>
        {tasks.map(task => (
          <DropdownOption key={task} onClick={() => handleTaskSelect(task)}>
            <p>{task}</p> 
          </DropdownOption>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
}


export default Outline;

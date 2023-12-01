import React, { useState } from 'react';
import styles from "@/styles/components/leftSideBar.module.css"


const defaultTasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4'];

function Outline({ tasksProp }) {
  const tasks = tasksProp || defaultTasks;
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(tasks[0]); 

  const toggleDropDown = () => {
    setDropDownOpen(prev => !prev);
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task); 
    setDropDownOpen(false); 
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownButton} onClick={toggleDropDown}>
        <p><b>Outline</b></p>
        <img 
          className={styles.dropdownSvg} 
          src="/Dropdown.svg" 
          alt="Toggle Dropdown"
          style={{ transform: dropDownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>
      <div className={`${styles.dropdownContent} ${dropDownOpen ? 'open' : ''}`}>
        {tasks.map(task => (
          <div className={styles.dropdownOption} key={task} onClick={() => handleTaskSelect(task)}>
            <p>{task}</p> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default Outline;
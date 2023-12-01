import React, { useState } from 'react';
import styles from "@/styles/components/leftSideBar.module.css"


const defaultTasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4'];

export default function Outline({ tasksProp }) {
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
    <div className={styles.OutlineContainer}>
      <div className={styles.containerHeading} onClick={toggleDropDown}>
        <p className={styles.headerText}>Outline</p>
        <img 
          className={styles.dropdownSvg} 
          src="/Dropdown.svg" 
          alt="Toggle Dropdown"
          style={{ transform: dropDownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>
      {dropDownOpen && (
        <div className={styles.dropDownContainer}>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div className={styles.taskContainer} key={task} onClick={() => handleTaskSelect(task)}>
                <p className={styles.dropDownText}>{task}</p>
              </div>
              ))
          ) : (
            <p className={styles.emptyTasksText}>You haven't written any minutes!</p>
          )}
        </div>
      )
      }
    </div>
  );
}

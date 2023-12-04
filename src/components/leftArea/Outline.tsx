import React, { useState } from 'react';
import styles from "@/styles/components/leftSideBar.module.css"


interface outlineProps {
  taskList: [{title:string, id:number}]
  setSelectedTask: any
}

export default function Outline(props: outlineProps) {
  const [dropDownOpen, setDropDownOpen] = useState(true);
  const filteredTasks = props.taskList.filter(item => item.title.trim() !== ''); // Filter out empty task lists

  const toggleDropDown = () => {
    setDropDownOpen(prev => !prev);
  };

  const handleTaskSelect = (taskID) => {
    props.setSelectedTask(taskID); 
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
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div className={styles.taskContainer} key={task.id} onClick={() => handleTaskSelect(task.id)}>
                <p className={`${styles.dropDownText} ${styles.clickableText}`}>{task.title}</p>
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

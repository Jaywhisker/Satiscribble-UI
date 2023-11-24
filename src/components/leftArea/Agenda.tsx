import React, { useState } from 'react';
import styles from "@/styles/components/leftSideBar.module.css"

const checkedImage = '/CheckboxTicked.svg'; 
const uncheckedImage = '/Checkbox.svg'; 


const defaultAgendaItems = [
  { name: 'Task 1', completed: false },
  { name: 'Task 2', completed: false },
  { name: 'Task 3', completed: false },
  { name: 'Task 4', completed: false },
];

interface AgendaItem {
  name: string;
  completed: boolean;
}

const Agenda = ({ agendaItems = defaultAgendaItems, onAgendaChange }) => {
  const handleCompletionChange = (index: number) => {
    const newAgendaItems = [...agendaItems];
    newAgendaItems[index].completed = !newAgendaItems[index].completed;

    if (onAgendaChange) {
      onAgendaChange(newAgendaItems);
    }
  };

  return (
    <div className={styles.agendaContainer}>
      <div className={styles.agendaContent}>
        <div className={styles.agendaButtonBar}>
          <b>Agenda</b>
        </div>
        {agendaItems.map((item, index) => (
          <div key={index} className={styles.agendaItemStyle}>
            <img
              className={styles.checkboxImage}
              src={item.completed ? checkedImage : uncheckedImage}
              alt={item.completed ? 'Checked' : 'Unchecked'}
              onClick={() => handleCompletionChange(index)}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agenda;
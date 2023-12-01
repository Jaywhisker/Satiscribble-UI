import React from 'react';
import styles from "@/styles/components/leftSideBar.module.css";

const checkedImage = '/CheckboxTicked.svg'; 
const uncheckedImage = '/Checkbox.svg'; 

interface AgendaItem {
  id: number; // Identifier for each agenda item
  name: string; // Content of agenda item
  completed: boolean; // Status of agenda item
}

const defaultAgendaItems: AgendaItem[] = [
  // Default items as placeholders, each with a unique id, only appears when used in isolation
  { id: 1, name: 'Task 1', completed: false },
  { id: 2, name: 'Task 2', completed: false },
  { id: 3, name: 'Task 3', completed: false },
  { id: 4, name: 'Task 4', completed: false },
];

const Agenda = ({ agendaItems = defaultAgendaItems, onAgendaChange }) => {
  const handleCompletionChange = (id: number) => { // Handles change in completion status of an agenda item
    const newAgendaItems = agendaItems.map(item => // Updates completion status of item with given id
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    if (onAgendaChange) { // Update parent component on the updated agenda items
      onAgendaChange(newAgendaItems);
    }
  };

  const filteredAgendaItems = agendaItems.filter(item => item.name.trim() !== ''); // Filter out agenda items that do not have content

  return (
    <div className={styles.agendaContainer}>
      <div className={styles.agendaContent}>
        <div className={styles.agendaButtonBar}>
          <b>Agenda</b>
        </div>
        {filteredAgendaItems.map((item) => (
          <div key={item.id} className={styles.agendaItemStyle}>
            <img
              className={styles.checkboxImage}
              src={item.completed ? checkedImage : uncheckedImage}
              alt={item.completed ? 'Checked' : 'Unchecked'}
              onClick={() => handleCompletionChange(item.id)}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agenda;

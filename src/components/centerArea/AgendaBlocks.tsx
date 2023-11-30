import React, { useState } from 'react';
import styles from "@/styles/components/DynamicTextArea.module.css";
import stylo from "@/styles/components/AgendaBlock.module.css";
import ModularTextFieldAgenda from './ModularTextFieldAgenda';

const checkedImage = '/CheckboxTicked.svg';
const uncheckedImage = '/Checkbox.svg';
const deleteIcon = '/Cancellation.svg';

const AgendaBlock = ({ agendaItems: externalAgendaItems, onAgendaChange }) => {
  const [internalAgendaItems, setInternalAgendaItems] = useState([{ id: 0, name: '', completed: false }]);
  const [nextId, setNextId] = useState(1);
  const agendaItems = externalAgendaItems || internalAgendaItems;

  const updateAgendaItems = (newAgendaItems) => { // Function to update agenda items
    if (onAgendaChange) {
      onAgendaChange(newAgendaItems);
    } else {
      setInternalAgendaItems(newAgendaItems);
    }
  };

  const handleCheckboxChange = (index) => { // Handles changes to content of agenda item
    const newAgendaItems = [...agendaItems];
    newAgendaItems[index].completed = !newAgendaItems[index].completed;
    updateAgendaItems(newAgendaItems);
  };

  const handleAgendaChange = (value, index) => { // Handles changes to the text of an agenda item
    const newAgendaItems = [...agendaItems];
    newAgendaItems[index].name = value;
    updateAgendaItems(newAgendaItems);
  };

  const handleKeyDown = (e, index) => { // Handles keyboard events like "Enter" and "Backspace"
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      addNewAgendaItem();
    } else if (e.key === 'Backspace' && agendaItems[index].name === '') {
      e.preventDefault();
      if (agendaItems.length > 1) {
        deleteAgendaItem(agendaItems[index].id);
      }
    }
  };

  const addNewAgendaItem = () => { // Adds a new agenda item to the list
    const newAgendaItems = [...agendaItems, { id: nextId, name: '', completed: false }];
    updateAgendaItems(newAgendaItems);
    setNextId(nextId + 1);
  };

  const deleteAgendaItem = (idToDelete) => { // Deletes agenda item
    if (agendaItems.length > 1) { // Prevents deletetion of row if there is only one agenda item left
      const newAgendaItems = agendaItems.filter(item => item.id !== idToDelete);
      updateAgendaItems(newAgendaItems);
    }
  };

  // Connect functionality to backend
  // Update agenda function
  // Retrieve agenda function


  return (
    <div className={styles.container}>
      <div className={stylo.titleContainer}>
        <h1 className={styles.titleTextStyle}>Agenda</h1>
      </div>
      {agendaItems.map((item, index) => (
        <div key={item.id} className={styles.agendaBlockTextFieldHolder}>
          <img
            src={item.completed ? checkedImage : uncheckedImage}
            alt={item.completed ? 'Checked' : 'Unchecked'}
            onClick={() => handleCheckboxChange(index)}
            className={stylo.checkboxImage}
          />
          <ModularTextFieldAgenda
            value={item.name}
            placeholder="Enter agenda item"
            onChange={(e) => handleAgendaChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
          {agendaItems.length > 1 && (
            <img 
              src={deleteIcon} 
              onClick={() => deleteAgendaItem(item.id)} 
              alt="Delete"
              className={stylo.deleteButton}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AgendaBlock;

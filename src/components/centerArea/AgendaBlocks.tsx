import React, { useState } from 'react';
import styles from "@/styles/components/DynamicTextArea.module.css";
import stylo from "@/styles/components/AgendaBlock.module.css"
import ModularTextFieldAgenda from './ModularTextFieldAgenda';

const checkedImage = '/CheckboxTicked.svg';
const uncheckedImage = '/Checkbox.svg';
const editIcon = '/Edit.svg';
const tickIcon = '/Check.svg';
const deleteIcon = '/Cancellation.svg';

const AgendaBlock = ({ agendaItems: externalAgendaItems, onAgendaChange }) => {
  const [internalAgendaItems, setInternalAgendaItems] = useState([{ id: 0, name: '', completed: false }]);
  const [nextId, setNextId] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false); // Track whether the component is in edit mode
  const agendaItems = externalAgendaItems || internalAgendaItems;

  const updateAgendaItems = (newAgendaItems) => { // Function to update agenda items
    if (onAgendaChange) {
      onAgendaChange(newAgendaItems);
    } else {
      setInternalAgendaItems(newAgendaItems);
    }
  };

  const handleCheckboxChange = (index) => {
    if (!isEditMode) return;

    const newAgendaItems = [...agendaItems];
    newAgendaItems[index].completed = !newAgendaItems[index].completed;
    updateAgendaItems(newAgendaItems);
  };

  const handleAgendaChange = (value, index) => { // Handles changes to the text of an agenda item
    const newAgendaItems = [...agendaItems];
    newAgendaItems[index].name = value;
    updateAgendaItems(newAgendaItems);
  };

  const canAddNewItem = () => { // Determines if a new agenda item can be added
    return agendaItems.length === 0 || agendaItems[agendaItems.length - 1].name.trim() !== '';
  };

  const addNewAgendaItem = () => { // Adds a new agenda item to the list
    if (canAddNewItem()) {
      const newAgendaItems = [...agendaItems, { id: nextId, name: '', completed: false }];
      updateAgendaItems(newAgendaItems);
      setNextId(nextId + 1);
    }
  };

  const deleteAgendaItem = (idToDelete) => { // Deletes an agenda item from the list
    const newAgendaItems = agendaItems.filter(item => item.id !== idToDelete);
    updateAgendaItems(newAgendaItems);
  };

  const toggleEditMode = () => { // Toggle edit mode
    if (isEditMode) { // Filter out empty agenda items before exiting edit mode
      const filteredAgendaItems = agendaItems.filter(item => item.name.trim() !== '');
      updateAgendaItems(filteredAgendaItems);
    }
    setIsEditMode(!isEditMode);
  };

  // TO DO:
  // Connect functionality to backend
  // Update agenda function
  // Retrieve agenda function
  
  return (
    <div className={styles.container}>
      <div className={stylo.titleContainer}>
        <h1 className={styles.titleTextStyle}>Agenda</h1>
        <img
          src={isEditMode ? tickIcon : editIcon} 
          onClick={toggleEditMode} 
          alt={isEditMode ? "Confirm" : "Edit"}
          className={stylo.editButton}
        />
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
            readOnly={!isEditMode}
          />
          {isEditMode && (
            <img 
              src={deleteIcon} 
              onClick={() => deleteAgendaItem(item.id)} 
              alt="Delete"
              className={stylo.deleteButton}
            />
          )}
        </div>
      ))}
      {isEditMode && (
        <button onClick={addNewAgendaItem} disabled={!canAddNewItem()} className={styles.addAgendaButton}>Add Agenda Item</button>
      )}
    </div>
  );
};

export default AgendaBlock;

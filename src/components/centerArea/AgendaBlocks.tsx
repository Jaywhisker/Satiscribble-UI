import React, { useState } from 'react';
import DynamicStyles from "@/styles/components/DynamicTextArea.module.css";
import AgendaStyles from "@/styles/components/AgendaBlock.module.css";
import ModularTextFieldAgenda from './ModularTextFieldAgenda';

const checkedImage = '/CheckboxTicked.svg';
const uncheckedImage = '/Checkbox.svg';
const deleteIcon = '/Cancellation.svg';

interface AgendaProps{
  agendaItems: [{id:string, name:string, completed:boolean}]
  setAgendaItems: any
}

const AgendaBlock = ({ agendaItems: externalAgendaItems, onAgendaChange }) => {
  const [internalAgendaItems, setInternalAgendaItems] = useState([{ id: 0, name: '', completed: false }]);
  const [nextId, setNextId] = useState(1);
  const agendaItems = externalAgendaItems || internalAgendaItems;

  const updateAgendaItems = (newAgendaItems) => { 
    // Function to update agenda items
    if (onAgendaChange) {
      onAgendaChange(newAgendaItems);
    } else {
      setInternalAgendaItems(newAgendaItems);
    }
  };

  const updateCheckbox = (index) => { 
    // Updates if Agenda has been updated (ticked or unticked)
    const newAgendaItems = [...agendaItems];
    newAgendaItems[index].completed = !newAgendaItems[index].completed;
    updateAgendaItems(newAgendaItems);
  };

  const handleAgendaChange = (value, index) => { 
    // Update Agenda Text
    const newAgendaItems = [...agendaItems];
    newAgendaItems[index].name = value;
    updateAgendaItems(newAgendaItems);
  };

  const handleKeyDown = (e, index) => { 
    // Key functions 
    // Create new input on enter
    // Delete previouse input on enter
    if (e.key === 'Enter') {
      e.preventDefault();
      addNewAgendaItem();
    } else if (e.key === 'Backspace' && agendaItems[index].name === '') {
      e.preventDefault();
      if (agendaItems.length > 1) {
        deleteAgendaItem(agendaItems[index].id);
        //add focus on modulartextfileagenda with id-1
      }
    }
  };

  const addNewAgendaItem = () => { // Adds a new agenda item to the list
    const newAgendaItems = [...agendaItems, { id: nextId, name: '', completed: false }];
    updateAgendaItems(newAgendaItems);
    setNextId(nextId + 1);
  };

  const deleteAgendaItem = (idToDelete) => { 
    // Deletes agenda item
    if (agendaItems.length > 1) { 
      // Prevents deletetion of row if there is only one agenda item left
      const newAgendaItems = agendaItems.filter(item => item.id !== idToDelete);
      updateAgendaItems(newAgendaItems);
    }
  };

  // Connect functionality to backend
  // Update agenda function
  // Retrieve agenda function


  return (
    <div className={DynamicStyles.genericBlock}>
      <div className={AgendaStyles.titleContainer}>
        <h1 className={DynamicStyles.genericTitleText}>Agenda</h1>
      </div>
      {agendaItems.map((item, index) => (
        <div key={item.id} className={DynamicStyles.agendaBlockTextFieldHolder}>
          <img
            src={item.completed ? checkedImage : uncheckedImage}
            alt={item.completed ? 'Checked' : 'Unchecked'}
            onClick={() => updateCheckbox(index)}
            className={AgendaStyles.checkboxImage}
          />
          <ModularTextFieldAgenda
            value={item.name}
            placeholder="Enter agenda item"
            onChange={(e) => handleAgendaChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
          {/* {agendaItems.length > 1 && (
            <img 
              src={deleteIcon} 
              onClick={() => deleteAgendaItem(item.id)} 
              alt="Delete"
              className={stylo.deleteButton}
            />
          )} */}
        </div>
      ))}
    </div>
  );
};

export default AgendaBlock;

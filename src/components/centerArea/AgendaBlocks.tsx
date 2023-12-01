import React, { useState, useEffect } from 'react';

import DynamicStyles from "@/styles/components/DynamicTextArea.module.css";
import AgendaStyles from "@/styles/components/AgendaBlock.module.css";

import ModularTextFieldAgenda from './ModularTextFieldAgenda';

import { updateAgenda } from '@/functions/api/updateMinutes';


interface AgendaProps{
  agendaItems: [{id:string, name:string, completed:boolean}]
  setAgendaItems: any
  minutesID: string
  chatHistoryID: string
}

export default function AgendaBlock(props: AgendaProps) {
  const checkedImage = '/CheckboxTicked.svg';
  const uncheckedImage = '/Checkbox.svg';
  const deleteIcon = '/Cancellation.svg';

  const [nextId, setNextId] = useState(0);
  const [focused, setFocused] = useState(true)
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (props.agendaItems.length <= 0) {
      addNewAgendaItem()
    }
  }, [])

  useEffect(() => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(async() => {
      if (!focused) {
        var agendaContent = props.agendaItems.map((agenda) => agenda.name ).filter((items) => items.trim() !== '')
        console.log('Agenda unfocused, updating agenda', agendaContent)
        var response = await updateAgenda(props.minutesID, props.chatHistoryID, agendaContent)
        if (response !== undefined) {
          console.log('ERROR:', response.ERROR)
        }
      }
    }, 1000);

    setTimeoutId(newTimeoutId);
    return () => {
      clearTimeout(newTimeoutId);
    };
  }, [focused])

  const updateAgendaItems = (newAgendaItems) => { 
    // Function to update agenda items
      props.setAgendaItems(newAgendaItems);
  };

  const updateCheckbox = (index) => { 
    // Updates if Agenda has been updated (ticked or unticked)
    const newAgendaItems = [...props.agendaItems];
    newAgendaItems[index].completed = !newAgendaItems[index].completed;
    updateAgendaItems(newAgendaItems);
  };

  const handleAgendaChange = (value, index) => { 
    // Update Agenda Text
    const newAgendaItems = [...props.agendaItems];
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
    } else if (e.key === 'Backspace' && props.agendaItems[index].name === '') {
      e.preventDefault();
      if (props.agendaItems.length > 1) {
        deleteAgendaItem(props.agendaItems[index].id);
        //add focus on modulartextfileagenda with id-1
      }
    }
  };

  const addNewAgendaItem = () => { // Adds a new agenda item to the list
    const newAgendaItems = [...props.agendaItems, { id: nextId, name: '', completed: false }];
    updateAgendaItems(newAgendaItems);
    setNextId(nextId + 1);
  };

  const deleteAgendaItem = (idToDelete) => { 
    // Deletes agenda item
    if (props.agendaItems.length > 1) { 
      // Prevents deletetion of row if there is only one agenda item left
      const newAgendaItems = props.agendaItems.filter(item => item.id !== idToDelete);
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
      {props.agendaItems.map((item, index) => (
        <div key={item.id} className={DynamicStyles.agendaBlockTextFieldHolder}>
          <img
            src={item.completed ? checkedImage : uncheckedImage}
            alt={item.completed ? 'Checked' : 'Unchecked'}
            onClick={() => updateCheckbox(index)}
            className={AgendaStyles.checkboxImage}
          />
          <ModularTextFieldAgenda
            value={item.name}
            placeholder="Enter agenda here"
            onChange={(e) => handleAgendaChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
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


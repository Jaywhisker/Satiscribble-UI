import React, { useState, useEffect, useRef } from 'react';
import DynamicStyles from "@/styles/components/DynamicTextArea.module.css";
import AgendaStyles from "@/styles/components/AgendaBlock.module.css";
import ModularTextFieldAgenda from './ModularTextFieldAgenda';
import { updateAgenda } from '@/functions/api/updateMinutes';

interface AgendaProps {
  agendaItems: [{ id: string, name: string, completed: boolean }];
  setAgendaItems: any;
  minutesID: string;
  chatHistoryID: string;
}

export default function AgendaBlock(props: AgendaProps) {
  const checkedImage = '/CheckboxTicked.svg';
  const uncheckedImage = '/Checkbox.svg';

  const [nextId, setNextId] = useState(0);
  // Track focused item index
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [timeoutId, setTimeoutId] = useState(null);

  // Refs for each agenda item's input
  const textInputRefs = useRef([]);

  useEffect(() => {
    if (props.agendaItems.length === 0) {
      addNewAgendaItem();
    }
  }, []);

  // Update the refs array when the agenda items change
  useEffect(() => {
    textInputRefs.current = textInputRefs.current.slice(0, props.agendaItems.length);
  }, [props.agendaItems]);

  useEffect(() => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(async () => {
      var agendaContent = props.agendaItems.map(item => item.name).filter(name => name.trim() !== '');
      console.log('Agenda unfocused, updating agenda', agendaContent);
      var response = await updateAgenda(props.minutesID, props.chatHistoryID, agendaContent);
      if (response !== undefined) {
        console.log('ERROR:', response.ERROR);
      }
    }, 1000);

    setTimeoutId(newTimeoutId);
    return () => {
      clearTimeout(newTimeoutId);
    };
  }, [props.agendaItems, props.minutesID, props.chatHistoryID, timeoutId]);

  const updateAgendaItems = (newAgendaItems) => {
    // Function to update agenda items
    props.setAgendaItems(newAgendaItems);
  };

  const updateCheckbox = (index) => {
    const newAgendaItems = [...props.agendaItems];
    newAgendaItems[index].completed = !newAgendaItems[index].completed;
    updateAgendaItems(newAgendaItems);
  };

  const handleAgendaChange = (value, index) => {
    const newAgendaItems = [...props.agendaItems];
    newAgendaItems[index].name = value;
    updateAgendaItems(newAgendaItems);
  };

  const handleKeyDown = (e, index) => {
    // Key functions
    // Create new input on enter
    // Delete previous input on enter
    if (e.key === 'Enter') {
      e.preventDefault();
      addNewAgendaItem(index);
    } else if (e.key === 'Backspace' && props.agendaItems[index].name === '') {
      e.preventDefault();
      if (props.agendaItems.length > 1) {
        // To determine the index to focus on after deletion
        const focusIndex = index > 0 ? index - 1 : 0;
        // Refactored to use Agenda item's index instead of its ID
        deleteAgendaItem(index, focusIndex);
      }
    }
  };

  // Function to add a new agenda item
  const addNewAgendaItem = (index) => {
    const newAgendaItems = [...props.agendaItems];
    const newAgendaItem = { id: `item-${nextId}`, name: '', completed: false };
    if (index !== null && index !== undefined) {
      newAgendaItems.splice(index + 1, 0, newAgendaItem);
    } else {
      newAgendaItems.push(newAgendaItem);
    }
    updateAgendaItems(newAgendaItems);
    setNextId(nextId + 1);

    // Set focus on the new item's input field
    setTimeout(() => {
      const newItemIndex = index !== null && index !== undefined ? index + 1 : newAgendaItems.length - 1;
      textInputRefs.current[newItemIndex]?.focus();
    }, 0);
  };

  // Function to delete an agenda item
  const deleteAgendaItem = (index, focusIndex) => {
    const newAgendaItems = props.agendaItems.filter((_, i) => i !== index);
    updateAgendaItems(newAgendaItems);

    // Set focus on the previous (or next if the first was deleted) item's input field
    setTimeout(() => {
        textInputRefs.current[focusIndex]?.focus();
    }, 0);
  };

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
            ref={(el) => (textInputRefs.current[index] = el)}
            value={item.name}
            placeholder="Enter agenda here"
            onChange={(e) => handleAgendaChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
          />
        </div>
      ))}
    </div>
  );
}

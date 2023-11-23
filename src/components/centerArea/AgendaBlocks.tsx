import React, { useState } from 'react';
import styled from 'styled-components';
import styles from "@/styles/components/DynamicTextArea.module.css";
import ModularTextFieldAgenda from './ModularTextFieldAgenda';

const checkedImage = '/CheckboxTicked.svg'; // Path to the checked (ticked) image
const uncheckedImage = '/Checkbox.svg'; // Path to the unchecked image

const CheckboxImage = styled.img`
  cursor: pointer;
  width: 24px;  
  height: 24px; 
`;

const AgendaBlock = () => {
  const [agendaItems, setAgendaItems] = useState([{ name: '', completed: false }]);

  const handleCheckboxChange = (index) => {
    const newAgendaItems = [...agendaItems];
    newAgendaItems[index].completed = !newAgendaItems[index].completed;
    setAgendaItems(newAgendaItems);
  };

  const handleAgendaChange = (value, index) => {
    const newAgendaItems = [...agendaItems];
    newAgendaItems[index].name = value;
    setAgendaItems(newAgendaItems);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' && agendaItems[index].name.trim() !== '') {
      e.preventDefault(); 
      addNewAgendaItem(); 
    }
  };

  const addNewAgendaItem = () => {
    setAgendaItems([...agendaItems, { name: '', completed: false }]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titleTextStyle}>Agenda</h1>
      {agendaItems.map((item, index) => (
        <div key={index} className={styles.agendaBlockTextFieldHolder}>
          <CheckboxImage
            src={item.completed ? checkedImage : uncheckedImage}
            alt={item.completed ? 'Checked' : 'Unchecked'}
            onClick={() => handleCheckboxChange(index)}
          />
          <ModularTextFieldAgenda
            value={item.name}
            placeholder="Enter agenda item"
            onChange={(e) => handleAgendaChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        </div>
      ))}
      <button onClick={addNewAgendaItem} className={styles.addAgendaButton}>Add Agenda Item</button>
    </div>
  );
};

export default AgendaBlock;

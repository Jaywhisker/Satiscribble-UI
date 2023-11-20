import React, { useState } from 'react';
import styled from 'styled-components';

const checkedImage = '/Checkbox.png'; 
const uncheckedImage = '/CheckboxTicked.png'; 

const AgendaContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
  padding-left: 18px;
  padding-right: 18px;
`;

const AgendaContent = styled.div`
  background-color: var(--Grey);
`;

const AgendaButtonBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0px;
  background-color: var(--Dark_Grey);
  color: var(--Nice_Blue);
  font-size: 16px;
  border-bottom: 2px solid var(--Nice_Blue); 
`;

const AgendaItemStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 12px;
  color: var(--Pure_White);
  font-size: 16px;
  border-bottom: 0px;
`;

const CheckboxImage = styled.img`
  cursor: pointer;
  margin-right: 12px;
  width: 24px;
  height: 24px;
`;

interface AgendaItem {
  name: string;
  completed: boolean;
}

const initialAgenda: AgendaItem[] = [
  { name: 'Item 1', completed: false },
  { name: 'Item 2', completed: false },
  { name: 'Item 3', completed: false },
  { name: 'Item 4', completed: false },
  // Add more items as needed
  // For visual representation, will be updated to .map
];

const Agenda: React.FC = () => {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(initialAgenda);

  const handleCompletionChange = (index: number) => {
    const newAgendaItems = [...agendaItems];
    newAgendaItems[index].completed = !newAgendaItems[index].completed;
    setAgendaItems(newAgendaItems);
    // Update backend here if needed
  };

  return (
    <AgendaContainer>
      <AgendaContent>
      <AgendaButtonBar>
        <b>Agenda</b>
      </AgendaButtonBar>
      {agendaItems.map((item, index) => (
        <AgendaItemStyle key={index}>
          <CheckboxImage
            src={item.completed ? checkedImage : uncheckedImage}
            alt={item.completed ? 'Checked' : 'Unchecked'}
            onClick={() => handleCompletionChange(index)}
          />
          {item.name}
        </AgendaItemStyle>
      ))}
      </AgendaContent>
    </AgendaContainer>
  );
};

export default Agenda;
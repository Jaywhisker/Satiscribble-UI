import React, { useState } from 'react';
import AgendaBlock from '@/components/centerArea/AgendaBlocks';
import Agenda from './agenda';

const ParentComponent = () => {
  const [agendaItems, setAgendaItems] = useState([{ name: '', completed: false }]);

  const handleAgendaChange = (newAgendaItems) => {
    setAgendaItems(newAgendaItems);
  };

  return (
    <div>
      <AgendaBlock agendaItems={agendaItems} onAgendaChange={handleAgendaChange} />
      <Agenda agendaItems={agendaItems} />
    </div>
  );
};

export default ParentComponent;

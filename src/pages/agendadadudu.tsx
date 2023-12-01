import React, { useState } from 'react';
import AgendaBlock from '@/components/centerArea/AgendaBlocks'; 
import Agenda from '@/components/leftArea/agenda'; 
import styles from "@/styles/components/AgendaBlock.module.css"

const AgendaPage = () => {
  const [agendaItems, setAgendaItems] = useState([{ name: '', completed: false }]); // Share state between AgendaBlock and Agenda
  
  const handleAgendaChange = (newAgendaItems) => { // Update agendaItems state, pass down to both Agenda Block and Agenda
    setAgendaItems(newAgendaItems);
  };

  return (
    <div>
      <h1>Agenda Page</h1>
      <div className={styles.margin}>
      <AgendaBlock agendaItems={agendaItems} onAgendaChange={handleAgendaChange} />
      </div>
      <Agenda agendaItems={agendaItems} onAgendaChange={handleAgendaChange} />
    </div>
  );
};

export default AgendaPage;
import {useState} from 'react';
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
  
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const updateCheckedItems = (id: number) => { 
    // Handles change in completion status of an agenda item
    const newAgendaItems = agendaItems.map(item => 
      // Updates completion status of item with given id
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    if (onAgendaChange) { 
      // Update parent component on the updated agenda items
      onAgendaChange(newAgendaItems);
    }
  };

  const toggleDropDown = () => {
    setDropDownOpen(prev => !prev);
  };


  const filteredAgendaItems = agendaItems.filter(item => item.name.trim() !== ''); // Filter out agenda items that do not have content

  return (
    <div className={styles.agendaContainer}>
      <div className={styles.containerHeading} onClick={toggleDropDown}>
        <p className={styles.headerText}>Agenda</p>
        <img 
          className={styles.dropdownSvg} 
          src="/Dropdown.svg" 
          alt="Toggle Dropdown"
          style={{ transform: dropDownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>
      {dropDownOpen && (
        <div className={styles.dropDownContainer}>
          {filteredAgendaItems.length > 0 ? (
            filteredAgendaItems.map((item) => (
              <div key={item.id} className={styles.taskContainer}>
                <img
                  className={styles.checkboxImage}
                  src={item.completed ? checkedImage : uncheckedImage}
                  alt={item.completed ? 'Checked' : 'Unchecked'}
                  onClick={() => updateCheckedItems(item.id)}
                />
                <p className={styles.checkedDropDownText}>{item.name}</p>
              </div>
            ))) : (
              <p className={styles.emptyTasksText}>You haven't written any agenda!</p>
            )
            }
        </div>
      )}
    </div>
  );
};

export default Agenda;

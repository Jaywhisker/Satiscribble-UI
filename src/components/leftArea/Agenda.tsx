import {useState} from 'react';
import outline from "@/styles/components/leftSideBar/leftSideBar.module.css";


interface agendaProps {
  agendaList: [{id:number, name:string, completed:boolean}],
  setAgendaList: any
}

//Example of agendaList: [
//   { id: 1, name: 'Task 1', completed: false },
//   { id: 2, name: 'Task 2', completed: false },
//   { id: 3, name: 'Task 3', completed: false },
// ];


export default function Agenda(props: agendaProps) {
    
  //Constants for HTML designs
  const checkedImage = '/CheckboxTicked.svg'; 
  const uncheckedImage = '/Checkbox.svg'; 


  //Use state of showing the drop down of the outline
  const [showDropDown, setShowDropDown] = useState(true);      
  
  const toggleDropDown = () => {
    setShowDropDown(prev => !prev);
  };


  //Removing empty agenda items from the agendaList
  const filteredAgendaItems = props.agendaList.filter(item => item.name.trim() !== ''); // Filter out agenda items that do not have content

  //Updates the agendaList Items to reflect the completion of the agenda item
  const updateCheckedItems = (id: number) => { 
    const newAgendaItems = props.agendaList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item  //Update completion status of item with given id
    );
      props.setAgendaList(newAgendaItems);
    }
    
    
    return (
      <div className={outline['agenda-mainContainer']}>
        <div className={outline['agenda-headerContainer']} onClick={toggleDropDown}>
          <p className={outline['agenda-headerText']}>Agenda</p>
          <svg 
              className={outline['agenda-dropDownIcons']} 
              style={{ transform: showDropDown ? 'rotate(180deg)' : 'rotate(0deg)' }}
              viewBox="0 0 19 10" 
              fill="none" 
              >
                <title>{showDropDown ? "Show Less": "Show More"}</title>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.5265 9.61822C10.2589 9.86267 9.89594 10 9.51754 10C9.13913 10 8.77621 9.86267 8.5086 9.61822L0.435668 2.24185C0.299368 2.12156 0.190651 1.97768 0.115859 1.81859C0.041068 1.65951 0.00170046 1.4884 5.3881e-05 1.31527C-0.00159269 1.14213 0.034515 0.970431 0.106269 0.810182C0.178024 0.649933 0.283988 0.504345 0.417979 0.381914C0.551971 0.259484 0.711305 0.162663 0.886687 0.0970995C1.06207 0.0315363 1.24998 -0.00145527 1.43947 4.92329e-05C1.62896 0.00155374 1.81621 0.0375246 1.99032 0.105863C2.16443 0.174201 2.3219 0.273537 2.45354 0.398077L9.51754 6.85257L16.5815 0.398077C16.8507 0.160554 17.2112 0.0291241 17.5853 0.0320951C17.9595 0.035066 18.3174 0.1722 18.582 0.41396C18.8466 0.655721 18.9967 0.982765 18.9999 1.32465C19.0032 1.66654 18.8594 1.99592 18.5994 2.24185L10.5265 9.61822Z" fill="#B1B1B1"/>
          </svg>
        </div>
        
        {/* If showDropDown */}
        {showDropDown && (
          <div className={outline['agenda-outlineContainer']}>
            
            {/* If there are agenda items, show the agenda items that are not empty lists (prevent spamming of new empty agenda) */}
            {filteredAgendaItems.length > 0 ? (
              filteredAgendaItems.map((item) => (
                <div key={item.id} className={outline['agenda-individualOutline']}>
                  <img
                    className={outline['agenda-checkBoxIcons']}
                    src={item.completed ? checkedImage : uncheckedImage}
                    alt={item.completed ? 'Checked' : 'Unchecked'}
                    onClick={() => updateCheckedItems(item.id)}
                  />
                  <p className={outline['agenda-outlineText']}>{item.name}</p>
                </div>
              ))) : (
                // If there are no agenda items, default text
                <p className={outline['agenda-defaultText']}>You haven't written any agenda!</p>
              )
              }
          </div>
        )}
      </div>
    );
    
}     


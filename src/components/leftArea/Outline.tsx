import React, { useState } from 'react';
import outline from "@/styles/components/leftSideBar/leftSideBar.module.css"


interface outlineProps {
  topicTitleList: [{title:string, id:number, placeholder:string}]
  setFocusedTopic: any
}

//Example of topicTitleList: [
//   { title: 'Example 1', id: 1, placeholder: 'Topic 1' },
//   { title: 'Example 2', id: 2, placeholder: 'Topic 2' },
//   { title: 'Example 3', id: 3, placeholder: 'Topic 3' },
// ];

export default function Outline(props: outlineProps) {

  //Use state of showing the drop down of the outline
  const [showDropDown, setShowDropDown] = useState(true);      
  
  const toggleDropDown = () => {
    setShowDropDown(prev => !prev);
  };

  //If topic is selected from the outline, set the selected topic to auto scrolling
  const handleTaskSelect = (topicID) => {
    props.setFocusedTopic(topicID); 
  };

  return (
    <div className={outline['topics-mainContainer']}>
      <div className={outline['topics-headerContainer']} onClick={toggleDropDown}>
        <p className={outline['topics-headerText']}>Outline</p>
        <svg 
              className={outline['topics-dropDownIcons']} 
              style={{ transform: showDropDown ? 'rotate(180deg)' : 'rotate(0deg)' }}
              viewBox="0 0 19 10" 
              fill="none" 
              >
                <title>{showDropDown ? "Show Less": "Show More"}</title>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.5265 9.61822C10.2589 9.86267 9.89594 10 9.51754 10C9.13913 10 8.77621 9.86267 8.5086 9.61822L0.435668 2.24185C0.299368 2.12156 0.190651 1.97768 0.115859 1.81859C0.041068 1.65951 0.00170046 1.4884 5.3881e-05 1.31527C-0.00159269 1.14213 0.034515 0.970431 0.106269 0.810182C0.178024 0.649933 0.283988 0.504345 0.417979 0.381914C0.551971 0.259484 0.711305 0.162663 0.886687 0.0970995C1.06207 0.0315363 1.24998 -0.00145527 1.43947 4.92329e-05C1.62896 0.00155374 1.81621 0.0375246 1.99032 0.105863C2.16443 0.174201 2.3219 0.273537 2.45354 0.398077L9.51754 6.85257L16.5815 0.398077C16.8507 0.160554 17.2112 0.0291241 17.5853 0.0320951C17.9595 0.035066 18.3174 0.1722 18.582 0.41396C18.8466 0.655721 18.9967 0.982765 18.9999 1.32465C19.0032 1.66654 18.8594 1.99592 18.5994 2.24185L10.5265 9.61822Z" fill="#B1B1B1"/>
          </svg>
      </div>
      {showDropDown && (
        <div className={outline['topics-outlineContainer']}>
          {props.topicTitleList.length > 0 ? (
            props.topicTitleList.map(task => (
              <div className={outline['topics-individualOutline']} key={task.id} onClick={() => handleTaskSelect(task.id)}>
                <p className={outline['topics-outlineText']}>{task.title || task.placeholder}</p>
              </div>
              ))
          ) : (
            <p className={outline['topics-defaultText']}>You haven't written any minutes!</p>
          )}
        </div>
      )
      }
    </div>
  );
}

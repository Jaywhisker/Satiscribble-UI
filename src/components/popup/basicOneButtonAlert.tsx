import React, { ReactNode, useState, useEffect } from 'react';
import { Button } from '../buttons';
import Icons from '../icons/icons';
import styles from '@/styles/components/popups.module.css';


interface PopupProps {
  colorVariant?: 'grey' | 'red';
  iconName?: string;
  iconColor?: 'white' | 'orange' | 'purple' | 'red' | 'green';
  messageTitle?: string;
  messageContent?: string;
  messageHeaderColor?: string;
  isOpen?: boolean;
  onClose: () => void;
  buttonFunction: (any) => void;
  children?: ReactNode;
  stateValue?: {};
  toast?: any;
}

const colorMapping = {
  Dark_Purple_Blue: 'rgb(52,53,65)',
  Nice_Blue: 'rgb(156,165,216)',
  Nice_Blue_10: 'rgb(156,165,216,0.1)',
  Nice_Blue_25: 'rgb(156,165,216,0.25)',
  Nice_Blue_75: 'rgba(156, 165, 216, 0.75)',
  Dark_Grey: 'rgb(32,33,35)',
  Grey: 'rgb(50,50,51)',
  Light_Grey: 'rgb(177,177,177)',
  Off_White: 'rgb(209,209,209)',
  Off_White_10: 'rgb(209,209,209, 0.1)',
  Off_White_25: 'rgb(209,209,209,0.25)',
  Off_White_50: 'rgb(209,209,209,0.5)',
  Blue: 'rgb(174,201,229)',
  Lighter_Grey: 'rgb(217,217,217,0.1)',
  Orange: 'rgb(255,206,133)',
  Alert_Red: 'rgba(171, 41, 41)',
  Alert_Red_75: 'rgba(171, 41, 41, 0.75)',
  Dark_Red: 'rgba(67, 41, 43)',
  Red: 'rgba(222, 92, 100)',
  Pure_White: 'rgb(255,255,255)',
  Darkish_Blue: 'rgb(78,89,156)',
  Not_Nice_Blue: 'rgb(156,165,216)',
  Not_Dark_Grey: 'rgb(32,33,35)',
  Not_Lighter_Grey: 'rgb(217,217,217,0.1)',
  Green: 'rgb(76, 175, 80)',
};


const BasicOneButtonAlert: React.FC<PopupProps> = ({
  colorVariant = 'grey',
  iconName = 'exclamation',
  iconColor = 'red',
  messageTitle = "Set title within 1 line",
  messageContent = "Set content of message. This component does not have CTA.",
  messageHeaderColor = "Orange",
  isOpen,
  onClose,
  buttonFunction,
  children,
  stateValue,
  toast,
  ...rest
}: PopupProps) => {
  

  const getIcon = () => {
    const IconComponent = Icons.GeneralIcon;
    return <IconComponent alt={iconName} name={iconName} color={iconColor} size="small" />;
  };

  const getHeaderColor = () => {
    const headerColor = messageHeaderColor ? colorMapping[messageHeaderColor] : '#FFCE85';
    return { color: headerColor };
  };

  const handleClose = () => {
    console.log('Closing the popup')
    onClose();
  };

  const handleClick = async() => {
    console.log('Button Clicked')
    onClose()

    const minutesID = localStorage.getItem('minutesID');
    const chatHistoryID = localStorage.getItem('chatHistoryID')

    // glossary details
    if (stateValue.hasOwnProperty('glossary')) {
        var abbreviation = stateValue.glossary.split("-")[0].trim().toUpperCase();
        var meaning = stateValue.glossary.split("-")[1].trim().toLowerCase();
        // @ts-ignore
        var response = await buttonFunction(minutesID, chatHistoryID, abbreviation, meaning)
        if (response !== undefined) {
            console.log(response.ERROR)
            setTimeout(() => {
                toast.glossaryAddFail(stateValue.glossary, toast)
            }, 1000)
          } else {
            setTimeout(() => {
                toast.glossaryAdd()
            }, 1000)
          }
    }
  }
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.Notif} ${styles[colorVariant + 'Notif']}`}>
      <span className={styles.topRow}>
        <span className={styles.titleCol}>
          {getIcon()}
          <p className={styles.messageHeader} style={getHeaderColor()}>
            {messageTitle}
          </p>
        </span>
        <Button
          buttonType="icon-button"
          size="small"
          fillBorderVariant="no-background"
          leftIcon={<Icons.GeneralIcon alt="Close" color="white" name="cancel" size="small" />}
          onClick={handleClose}
        ></Button>
      </span>
      <p className={styles.messageContent}>{messageContent}</p>
      <span className={styles.actionButtons}>
        <Button size="small" fillBorderVariant="border" colorVariant="white" onClick={handleClick}>
          TRY AGAIN
        </Button>
      </span>
    </div>
  ) 
};

export default BasicOneButtonAlert;
import PopUp from '@/components/popup';
import styles from '@/styles/components/popups.module.css';
import { useToast } from '@/hooks/useToast';
import React, { useState, useEffect  } from "react";
import { createGlossaryEntry } from '@/functions/api/glossaryActions';
import { updateAgenda, updateMeetingDetails, updateMinutes } from '@/functions/api/updateMinutes';

export interface ToastProps {
    type: 'agenda' | 'inactivity' | 'changeTopic' | 'detectAbbrev' | 'topicLength' | 'addTopicfail' | 'glossaryAdd';
    id: number;
    stateValue: number ;
    message?: string;
    inactivityRef?: any;
    inaccuracyValue?: number;
    setInaccuracyValue?: any;
    createNewTopic?: () => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, stateValue, message, inactivityRef, inaccuracyValue, setInaccuracyValue, createNewTopic }) => {
    const toast = useToast()
    const [dismissed, setDismissed] = useState(false);

    const handleDismiss = () => {
        setDismissed(true);
        toast.remove(id);
    };

    // Declare toastTypes
    const toastTypes = {
        agenda: {
            popup: <PopUp.AgendaAlert 
            isOpen={true} 
            onClose={handleDismiss} 
            stateValue={stateValue} 
            inaccuracyValue={inaccuracyValue} 
            setInaccuracyValue={setInaccuracyValue}/>
        },
        inactivity: {
            popup: <PopUp.InactivityAlert 
            isOpen={true} 
            onClose={handleDismiss} 
            stateValue={stateValue} 
            inactivityRef={inactivityRef}/>
        },
        changeTopic: {
            popup: <PopUp.TopicChangeAlert 
            isOpen={true} 
            onClose={handleDismiss} 
            stateValue={stateValue} 
            inaccuracyValue={inaccuracyValue} 
            setInaccuracyValue={setInaccuracyValue} 
            createNewTopic={createNewTopic}/>
        },
        detectAbbrev: {
            popup: <PopUp.DetectAlert 
            detectedAbbrev={message} 
            isOpen={true} 
            onClose={handleDismiss} 
            stateValue={stateValue} 
            toast={toast}/>
        },
        topicLength: {
            popup: <PopUp.BasicAlert
                colorVariant="red"
                iconName="exclamation"
                iconColor="red"
                messageTitle="Topic Length Alert"
                messageContent="The current topic block has exceeded 1000 tokens. Your topic may be too long for effective discussion."
                messageHeaderColor="Red"
                isOpen={true}
                onClose={handleDismiss} 
                stateValue={stateValue} 
                />
        },
        addTopicfail: {
            popup: <PopUp.BasicAlert
                colorVariant="red"
                iconName="exclamation"
                iconColor="red"
                messageTitle="Creating New Topic Failed"
                messageContent="Oops! It seems we can't add a new topic just yet. To proceed, please make sure the agenda block is filled out."
                messageHeaderColor="Red"
                isOpen={true}
                onClose={handleDismiss}
                stateValue={stateValue} 
                />
        },
        glossaryAdd: {
            popup: <PopUp.BasicAlert
                colorVariant="grey"
                iconName="check"
                iconColor="green"
                messageTitle="Glossary Addition Successful"
                messageContent="Great news! Your abbreviation has been successfully added to the glossary."
                messageHeaderColor="Green"
                isOpen={true}
                onClose={handleDismiss} 
                stateValue={stateValue} 
                />
        },
        glossaryAddFail: {
            popup: <PopUp.BasicOneButtonAlert
                colorVariant="red"
                iconName="exclamation"
                iconColor="red"
                messageTitle="Glossary Addition Failed"
                messageContent="Oh no! Your abbreviation could not be added to the glossary. Please try again."
                messageHeaderColor="Red"
                isOpen={true}
                onClose={handleDismiss}
                buttonFunction={(minutesID, chatHistoryID, abbreviation, meaning) => createGlossaryEntry(minutesID, chatHistoryID, abbreviation, meaning)}
                dataValue={{"glossary": message}}
                stateValue={stateValue} 
                toast = {toast} />
        },
        agendaSaveFail: {
            popup: <PopUp.BasicOneButtonAlert
            colorVariant="red"
            iconName="exclamation"
            iconColor="red"
            messageTitle="Agenda Autosave Failed"
            messageContent="Oh no! Your agenda couldn't be saved. Please try again or edit your agenda to retrigger autosave."
            messageHeaderColor="Red"
            isOpen={true}
            onClose={handleDismiss}
            buttonFunction={(minutesID, chatHistoryID, agenda) => updateAgenda(minutesID, chatHistoryID, agenda)}
            stateValue={stateValue}
            dataValue={{"agenda": message}}
            toast = {toast} />
        },
        meetingSaveFail: {
            popup: <PopUp.BasicOneButtonAlert
            colorVariant="red"
            iconName="exclamation"
            iconColor="red"
            messageTitle="Meeting Details Autosave Failed"
            messageContent="Oh no! Your meeting details couldn't be saved. Please try again or edit your meeting details to retrigger autosave."
            messageHeaderColor="Red"
            isOpen={true}
            onClose={handleDismiss}
            buttonFunction={(minutesID, chatHistoryID, location, attendees) => updateMeetingDetails(minutesID, chatHistoryID, location, attendees)}
            stateValue={stateValue}
            dataValue={{"meetingDetails": message}}
            toast = {toast} />
        },
        minutesSaveFail: {
            popup: <PopUp.BasicOneButtonAlert
            colorVariant="red"
            iconName="exclamation"
            iconColor="red"
            messageTitle="Minutes Auto Save Failed"
            messageContent={`Oh no! Your latest edits to ${message?.reqData?.topicTitle || ""} couldn't be saved. Please try again or edit ${message?.reqData?.topicTitle || ""} to retrigger autosave.`}
            messageHeaderColor="Red"
            isOpen={true}
            onClose={handleDismiss}
            buttonFunction={(reqData, toast, agendaInaccuracyCounter,setAgendaInaccuracyCounter,topicInaccuracyCounter,setTopicInaccuracyCounter,onAddTopicArea) => updateMinutes(reqData, toast,agendaInaccuracyCounter,setAgendaInaccuracyCounter,topicInaccuracyCounter,setTopicInaccuracyCounter, onAddTopicArea, [], undefined, true)}
            stateValue={stateValue}
            dataValue={{"minutesDetails": message}}
            toast = {toast} />
        },
    };

    const currentToast = toastTypes[type];


    return (
        <div className={`${styles.toast} ${dismissed ? styles["toast-dismissed"] : ""}`}>
            {currentToast && currentToast.popup}
        </div>
    );
};

export default Toast;

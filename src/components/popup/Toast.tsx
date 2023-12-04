import PopUp from '@/components/popup';
import styles from '@/styles/popups.module.css';
import { useToast } from '@/hooks/useToast';
import { useState } from "react";

export interface ToastProps {
    type: 'agenda' | 'inactivity' | 'changeTopic' | 'detectAbbrev' | 'topicLength' | 'addTopicfail' | 'glossaryAdd';
    id: number;
    message?: string;
}

const Toast: React.FC<ToastProps> = ({ type, id, message }) => {
    const toast = useToast()

    const [dismissed, setDismissed] = useState(false);

    const handleDismiss = () => {
        setDismissed(true);
        setTimeout(() => {
            toast.remove(id);
        }, 500);  // Adjust the duration based on your CSS animation duration
    };

    // Declare toastTypes
    const toastTypes = {
        agenda: {
            popup: <PopUp.AgendaAlert isOpen={true} onClose={handleDismiss} />
        },
        inactivity: {
            popup: <PopUp.InactivityAlert isOpen={true} onClose={handleDismiss} />
        },
        changeTopic: {
            popup: <PopUp.TopicChangeAlert isOpen={true} onClose={handleDismiss} />
        },
        detectAbbrev: {
            popup: <PopUp.DetectAlert detectedAbbrev={message} isOpen={true} onClose={handleDismiss} />
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
                onClose={handleDismiss} />
        },
        addTopicfail: {
            popup: <PopUp.BasicAlert
                colorVariant="red"
                iconName="exclamation"
                iconColor="red"
                messageTitle="Add new topic failed"
                messageContent="Oops! It seems we can't add a new topic just yet. To proceed, please make sure both the meeting details and agenda blocks are filled out."
                messageHeaderColor="Red"
                isOpen={true}
                onClose={handleDismiss} />
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
                onClose={() => { handleDismiss }} />
        }
    };

    const currentToast = toastTypes[type];


    return (
        <div className={`${styles.toast} ${dismissed ? styles["toast-dismissed"] : ""}`}>
            {currentToast && currentToast.popup}
        </div>
    );
};

export default Toast;

import PopUp from '@/components/popup';
import styles from '@/styles/popups.module.css';

export interface ToastProps {
    type: 'agenda' | 'inactivity' | 'changeTopic' | 'detectAbbrev' | 'topicLength' | 'addTopicfail'| 'glossaryAdd';
    id: string;
    message?: string;
}


const Toast: React.FC<ToastProps> = ({ type, id, message }) => {
    // Declare toastTypes
    const toastTypes = {
        agenda: {
            popup: <PopUp.AgendaAlert onClose={() => { }} />
        },
        inactivity: {
            popup: <PopUp.InactivityAlert onClose={() => { }} />
        },
        changeTopic: {
            popup: <PopUp.TopicChangeAlert onClose={() => { }} />
        },
        detectAbbrev: {
            popup: <PopUp.DetectAlert detectedAbbrev={message} onClose={() => { }} />
        },
        topicLength: {
            popup: <PopUp.BasicAlert
                colorVariant="red"
                iconName="exclamation"
                iconColor="red"
                messageTitle="Topic Length Alert"
                messageContent="The current topic block has exceeded 1000 tokens. Your topic may be too long for effective discussion."
                messageHeaderColor="Red"
                onClose={() => { }} />
        },
        addTopicfail: {
            popup: <PopUp.BasicAlert
                colorVariant="red"
                iconName="exclamation"
                iconColor="red"
                messageTitle="Add new topic failed"
                messageContent="Oops! It seems we can't add a new topic just yet. To proceed, please make sure both the meeting details and agenda blocks are filled out."
                messageHeaderColor="Red"
                onClose={() => { }} />
        },
        glossaryAdd: {
            popup: <PopUp.BasicAlert
                colorVariant="grey"
                iconName="check"
                iconColor="green"
                messageTitle="Glossary Addition Successful"
                messageContent="Great news! Your abbreviation has been successfully added to the glossary."
                messageHeaderColor="Green"
                onClose={() => { }} />
        }
    };

    const currentToast = toastTypes[type];

    return (
        <div>
            {currentToast && currentToast.popup}
        </div>
    );
};

export default Toast;

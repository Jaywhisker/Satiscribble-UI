import React from 'react';
import { ToastContextProvider } from '@/contexts/ToastContext';
import { Button } from '@/components/buttons';
import { useToast } from "@/hooks/useToast";

const NotificationButton: React.FC = () => {
    const toast = useToast();

    return (
        <div style={{ display:'flex', flexDirection: 'column', gap: '1vw'}}>
            <Button size="medium" fillBorderVariant="fill" onClick={() => { console.log('Agenda button clicked'); toast.agenda(); }}>
                Agenda
            </Button>
            <Button size="medium" fillBorderVariant="fill" onClick={() => { console.log('Inactivity button clicked');toast.inactivity();}}>
                Inactivity
            </Button>
            <Button size="medium" fillBorderVariant="fill" onClick={() => {console.log('changeTopic button clicked');toast.changeTopic()}}>
                Change Topic
            </Button>
            <Button size="medium" fillBorderVariant="fill" onClick={() => {console.log('detectAbbrev button clicked'); toast.detectAbbrev('LOL - League of Legends')}}>
                Detect Abbrev
            </Button>
            <Button size="medium" fillBorderVariant="fill" onClick={() => {console.log('topicLength button clicked');toast.topicLength()}}>
                Topic Length
            </Button>
            <Button size="medium" fillBorderVariant="fill" onClick={() => {console.log('addTopicfail button clicked'); toast.addTopicfail()}}>
                Add topic fail
            </Button>
            <Button size="medium" fillBorderVariant="fill" onClick={() =>  {console.log('glossary button clicked');toast.glossaryAdd()}}>
                Glossary add
            </Button>
        </div>
    );
};

const AnimationPage: React.FC = () => (
    <React.StrictMode>
        <ToastContextProvider>
            <NotificationButton />
        </ToastContextProvider>
    </React.StrictMode>
);

export default AnimationPage;

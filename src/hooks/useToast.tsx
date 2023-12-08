// useToast.tsx
import { useContext } from 'react';
import { ToastContextType, ToastContext } from "@/contexts/ToastContext";

export const useToast = (): ToastContextType => {
    const toastContext = useContext(ToastContext);

    if (!toastContext) {
        throw new Error('useToast must be used within a ToastContextProvider');
    }

    const { agenda, inactivity, changeTopic, detectAbbrev, topicLength, addTopicfail, glossaryAdd, remove, update, alertContainer } = useContext(ToastContext);

    return {
        agenda,
        inactivity,
        changeTopic,
        detectAbbrev,
        topicLength,
        addTopicfail,
        glossaryAdd,
        remove,
        update,
        alertContainer
    };
};

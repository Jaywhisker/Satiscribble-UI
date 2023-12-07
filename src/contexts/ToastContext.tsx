import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import { toastReducer } from "@/reducers/toastReducer";
import ToastsContainer from "@/components/popup/ToastsContainer";

export type ToastContextType = {
    agenda: (message?: string) => void;
    inactivity: (message?: string) => void;
    changeTopic: (message?: string) => void;
    detectAbbrev: (message: string) => void;
    topicLength: (message?: string) => void;
    addTopicfail: (message?: string) => void;
    glossaryAdd: (message?: string) => void;
    remove: (id: number) => void;
};


interface ToastContextProps {
    children: ReactNode;
}

interface Toast {
    id: string;
    type: string;
    message?: string;
}

const initialState = {
    toasts: [],
};

type ToastAction =
    | { type: "ADD_TOAST"; payload: Toast }
    | { type: "DELETE_TOAST"; payload: number };


export const ToastContextProvider: React.FC<ToastContextProps> = ({ children }) => {
    const [state, dispatch] = useReducer(toastReducer, initialState);

    const addToast = (type: string, message?: string): void => {
        const id = Math.floor(Math.random() * 10000000);
        console.log('Dispatching ADD_TOAST action');
        dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
    };
    
    const remove = ( id: number): void => {
        dispatch({ type: "DELETE_TOAST", payload: id });
    };
    
    const value: ToastContextType = {
        agenda: (message?: string) => addToast("agenda", message),
        inactivity: (message?: string) => addToast("inactivity", message),
        changeTopic: (message?: string) => addToast("changeTopic", message),
        detectAbbrev: (message: string) => addToast("detectAbbrev", message),
        topicLength: (message?: string) => addToast("topicLength", message),
        addTopicfail: (message?: string) => addToast("addTopicfail", message),
        glossaryAdd: (message?: string) => addToast("glossaryAdd", message),
        remove,
    };

    return (
        <ToastContext.Provider value={value || undefined}>
            <ToastsContainer toasts={state.toasts} />
            {children}
        </ToastContext.Provider>
    );
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);


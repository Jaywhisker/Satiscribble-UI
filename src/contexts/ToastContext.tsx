import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import { toastReducer } from "@/reducers/toastReducer";
import ToastsContainer from "@/components/popup/ToastsContainer";

export type ToastContextType = {
    agenda: (inaccurateAgenda:number, setInaccurateAgenda:any, message?: string) => void;
    inactivity: (inactivityRef: any, message?: string) => void;
    changeTopic: (inaccurateTopic:number, setInaccurateTopic:any, createNewTopic:()=>void, message?: string) => void;
    detectAbbrev: (message: string, toast:any) => void;
    topicLength: (message?: string) => void;
    addTopicfail: (message?: string) => void;
    glossaryAdd: (message?: string) => void;
    remove: (id: number) => void;
    alertContainer: any[];
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

    const addToast = (type: string, message?: string, inactivityRef?: any, inaccuracyValue?:number, setInaccuracyValue?:any, createNewTopic? :() => void, toast?:any): void => {
        //logic on checking notification container size will be here
        //probably using toast.states to check the size 
        //if yes, allow for dispatch else do remove function
        const id = Math.floor(Math.random() * 10000000);
        console.log('Dispatching ADD_TOAST action');
        dispatch({ type: "ADD_TOAST", payload: { id, message, type, inactivityRef, inaccuracyValue, setInaccuracyValue, createNewTopic, toast} });
    };
    
    const remove = ( id: number): void => {
        setTimeout(() => {
            dispatch({ type: "DELETE_TOAST", payload: id });
        }, 500)
    };
    
    
    const value: ToastContextType = {
        agenda: (inaccurateAgenda:number, setInaccurateAgenda:any, message?: string) => addToast("agenda", message, null, inaccurateAgenda, setInaccurateAgenda),
        inactivity: (inactivityRef: any, message?: string) => addToast("inactivity", message, inactivityRef),
        changeTopic: (inaccurateTopic:number, setInaccurateTopic:any, createNewTopic:()=> void, message?: string) => addToast("changeTopic", message, null, inaccurateTopic, setInaccurateTopic, createNewTopic),
        detectAbbrev: (message: string, toast:any) => addToast("detectAbbrev", message=message, toast=toast),
        topicLength: (message?: string) => addToast("topicLength", message),
        addTopicfail: (message?: string) => addToast("addTopicfail", message),
        glossaryAdd: (message?: string) => addToast("glossaryAdd", message),
        remove,
        alertContainer: state.toasts
    };


    return (
        <ToastContext.Provider value={value || undefined}>
            <ToastsContainer toasts={state.toasts} />
            {children}
        </ToastContext.Provider>
    );
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);


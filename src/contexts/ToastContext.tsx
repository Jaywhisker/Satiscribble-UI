import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import { toastReducer } from "@/reducers/toastReducer";
import ToastsContainer from "@/components/popup/ToastsContainer";

export type ToastContextType = {
    agenda: (inaccurateAgenda:number, setInaccurateAgenda:any, message?: string) => void;
    inactivity: (inactivityRef: any, message?: string) => void;
    changeTopic: (inaccurateTopic:number, setInaccurateTopic:any, createNewTopic:()=>void, message?: string) => void;
    detectAbbrev: (message: string, toast:any) => void;
    topicLength: (message?: string) => void;
    addTopicfail: (stateValue:boolean, message?: string) => void;
    glossaryAdd: (message?: string) => void;
    glossaryAddFail: (message: string, toast:any) => void;
    agendaSaveFail: (message: string | {}, stateValue:boolean, toast:any) => void;
    meetingSaveFail: (message: string | {}, stateValue:boolean, toast:any) => void;
    minutesSaveFail: (message: string | {}, stateValue:boolean, toast:any) => void;
    remove: (id: number) => void;
    update : (id: number, type: string, message?: string, inactivityRef?: any, stateValue?:number | boolean, setState?:any, createNewTopic? :() => void, toast?:any) => void
    alertContainer: any[];
};


interface ToastContextProps {
    children: ReactNode;
}

interface Toast {
    id: string;
    type: string;
    message?: string | {};
}

const initialState = {
    toasts: [],
};

type ToastAction =
    | { type: "ADD_TOAST"; payload: Toast }
    | { type: "DELETE_TOAST"; payload: number };


export const ToastContextProvider: React.FC<ToastContextProps> = ({ children }) => {
    const [state, dispatch] = useReducer(toastReducer, initialState);

    const addToast = (type: string, message?: string | {}, inactivityRef?: any, stateValue?:number | boolean, setState?:any, createNewTopic? :() => void, toast?:any): void => {
        //logic on checking notification container size will be here
        //probably using toast.states to check the size 
        //if yes, allow for dispatch else do remove function
        const id = Math.floor(Math.random() * 10000000);

        if (state.toasts.length >= 2) {
            update(state.toasts[0].id, state.toasts[0].type, null, null, true)
        } 
        console.log('Dispatching ADD_TOAST action');
        dispatch({ type: "ADD_TOAST", payload: { id, message, type, inactivityRef, stateValue, setState, createNewTopic, toast} });
    };
    
    const remove = ( id: number): void => {
        setTimeout(() => {
            dispatch({ type: "DELETE_TOAST", payload: id });
        }, 1000)
    };

    const update = (id: number, type: string, message?: string | {}, inactivityRef?: any, stateValue?:number | boolean, setState?:any, createNewTopic? :() => void, toast?:any): void => {
        dispatch({type: "UPDATE_TOAST", payload: { id, message, type, inactivityRef, stateValue, setState, createNewTopic, toast} })
    }
    
    
    const value: ToastContextType = {
        agenda: (inaccurateAgenda:number, setInaccurateAgenda:any, message?: string) => addToast("agenda", message, null, inaccurateAgenda, setInaccurateAgenda),
        inactivity: (inactivityRef: any, message?: string) => addToast("inactivity", message, inactivityRef),
        changeTopic: (inaccurateTopic:number, setInaccurateTopic:any, createNewTopic:()=> void, message?: string) => addToast("changeTopic", message, null, inaccurateTopic, setInaccurateTopic, createNewTopic),
        detectAbbrev: (message: string, toast:any) => addToast("detectAbbrev", message, null, null, null, null, toast),
        topicLength: (message?: string) => addToast("topicLength", message),
        addTopicfail: (stateValue:boolean, message?: string) => addToast("addTopicfail", message, null, stateValue),
        glossaryAdd: (message?: string) => addToast("glossaryAdd", message),
        glossaryAddFail: (message: string, toast:any) => addToast("glossaryAddFail", message, null, null, null, null, toast),
        agendaSaveFail: (message: string | {}, stateValue:boolean, toast:any) => addToast("agendaSaveFail", message, null, stateValue, null, null, toast),
        meetingSaveFail: (message: string | {}, stateValue:boolean, toast:any) => addToast("meetingSaveFail", message, null, stateValue, null, null, toast),
        minutesSaveFail: (message: string | {}, stateValue:boolean, toast:any) => addToast("minutesSaveFail", message, null, stateValue, null, null, toast),
        remove,
        update,
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


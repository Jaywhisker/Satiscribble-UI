import React, { createContext, useReducer, ReactNode } from "react";
import { toastReducer } from "@/reducers/toastReducer";
import ToastsContainer from "@/components/popup/ToastsContainer";

export type ToastContextType = {
    agenda: (stateValue:boolean, inaccurateAgenda:number, setInaccurateAgenda:any, message?: string) => void;
    inactivity: (stateValue:boolean, inactivityRef: any, message?: string) => void;
    changeTopic: (stateValue:boolean, inaccurateTopic:number, setInaccurateTopic:any, createNewTopic:()=>void, message?: string) => void;
    detectAbbrev: (stateValue:boolean, message: string) => void;
    topicLength: (stateValue:boolean, message?: string) => void;
    addTopicfail: (stateValue:boolean, message?: string) => void;
    glossaryAdd: (stateValue:boolean, message?: string) => void;
    glossaryAddFail: (stateValue:boolean, message: string) => void;
    agendaSaveFail: (stateValue:boolean, message: string | {}) => void;
    meetingSaveFail: (stateValue:boolean, message: string | {}) => void;
    minutesSaveFail: (stateValue:boolean, message: string | {}) => void;
    remove: (id: number) => void;
    update : (id: number, type: string, stateValue:boolean, message?: string, inactivityRef?: any , inAccuracyValue?: number, setInaccuracyState?:any, createNewTopic? :() => void) => void
    alertContainer: any[];
};


interface ToastContextProps {
    children: ReactNode;
}

interface Toast {
    type: string, 
    message?: string | {}, 
    inactivityRef?: any, 
    stateValue?:number | boolean, 
    inaccuracyValue?: number, 
    setInaccuracyValue?:any, 
    createNewTopic? :() => void
}

const initialState = {
    toasts: [],
};

type ToastAction =
    | { type: "ADD_TOAST"; payload: Toast }
    | { type: "DELETE_TOAST"; payload: number }
    | { type: "UPDATE_TOAST"; payload: Toast };


export const ToastContextProvider: React.FC<ToastContextProps> = ({ children }) => {
    const [state, dispatch] = useReducer(toastReducer, initialState);

    const addToast = (type: string, 
        stateValue:boolean, 
        message?: string | {}, 
        inactivityRef?: any, 
        inaccuracyValue?: number, 
        setInaccuracyValue?:any, 
        createNewTopic? :() => void): void => {
        //logic on checking notification container size will be here
        //probably using toast.states to check the size 
        //if yes, allow for dispatch else do remove function
        const id = Math.floor(Math.random() * 10000000);

        if (state.toasts.length >= 2) {
            console.log(state.toasts)
            update(state.toasts[0].id, state.toasts[0].type, true)
        } 
        console.log('Dispatching ADD_TOAST action');
        dispatch({ type: "ADD_TOAST", payload: { id, type, stateValue, message, inactivityRef, inaccuracyValue, setInaccuracyValue, createNewTopic} });
    };
    
    const remove = ( id: number): void => {
        setTimeout(() => {
            dispatch({ type: "DELETE_TOAST", payload: id });
        }, 1000)
    };

    const update = (id: number, 
        type: string, 
        stateValue:Boolean, 
        message?: string | {}, 
        inactivityRef?: any, 
        inaccuracyValue?: number, 
        setInaccuracyValue?:any, 
        createNewTopic? :() => void): void => {
            console.log('updating')
            dispatch({type: "UPDATE_TOAST", payload:{ id, type, stateValue, message, inactivityRef, inaccuracyValue, setInaccuracyValue, createNewTopic} })
    }
    
    
    const value: ToastContextType = {
        agenda: (stateValue:boolean, inaccurateAgenda:number, setInaccurateAgenda:any, message?: string) => addToast("agenda", stateValue, message, null, inaccurateAgenda, setInaccurateAgenda),
        inactivity: (stateValue:boolean, inactivityRef: any, message?: string) => addToast("inactivity", stateValue, message, inactivityRef),
        changeTopic: (stateValue:boolean, inaccurateTopic:number, setInaccurateTopic:any, createNewTopic:()=> void, message?: string) => addToast("changeTopic", stateValue, message, null, inaccurateTopic, setInaccurateTopic, createNewTopic),
        detectAbbrev: (stateValue:boolean, message: string) => addToast("detectAbbrev", stateValue, message),
        topicLength: (stateValue:boolean, message?: string) => addToast("topicLength", stateValue, message),
        addTopicfail: (stateValue:boolean, message?: string) => addToast("addTopicfail", stateValue, message),
        glossaryAdd: (stateValue:boolean, message?: string) => addToast("glossaryAdd", stateValue, message),
        glossaryAddFail: (stateValue:boolean, message: string) => addToast("glossaryAddFail", stateValue, message),
        agendaSaveFail: (stateValue:boolean, message: string | {}) => addToast("agendaSaveFail", stateValue, message),
        meetingSaveFail: (stateValue:boolean, message: string | {}) => addToast("meetingSaveFail", stateValue, message),
        minutesSaveFail: (stateValue:boolean, message: string | {}) => addToast("minutesSaveFail", stateValue, message),
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


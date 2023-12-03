import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import { toastReducer } from "@/reducers/toastReducer";
import ToastsContainer from "@/components/popup/ToastsContainer";

interface ToastContextProps {
    children: ReactNode;
}

interface Toast {
    id: number;
    type: string; // Replace with the actual type
    message?: string;
}

const initialState = {
    toasts: [],
};

type ToastAction =
    | { type: "ADD_TOAST"; payload: Toast }
    | { type: "DELETE_TOAST"; payload: number };

const addToast = (dispatch: Dispatch<ToastAction>, type: string, message?: string): void => {
    const id = Math.floor(Math.random() * 10000000);
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
};

const remove = (dispatch: Dispatch<ToastAction>, id: number): void => {
    dispatch({ type: "DELETE_TOAST", payload: id });
};


export const ToastContextProvider: React.FC<ToastContextProps> = ({ children }) => {
    const [state, dispatch] = useReducer(toastReducer, initialState);
    return (
        <ToastContext.Provider value={{}}>
            <ToastsContainer toasts={state.toasts} />
            {children}
        </ToastContext.Provider>
    );
};

export const ToastContext = createContext({});

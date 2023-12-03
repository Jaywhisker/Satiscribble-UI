interface Toast {
    id: string;
    type: string; // Replace with the actual type
    message?: string;
  }
  
  interface ToastState {
    toasts: Toast[];
  }
  
  type ToastAction =
    | { type: "ADD_TOAST"; payload: Toast }
    | { type: "DELETE_TOAST"; payload: string };
  
  export const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
    switch (action.type) {
      case "ADD_TOAST":
        return {
          ...state,
          toasts: [...state.toasts, action.payload],
        };
      case "DELETE_TOAST":
        const updatedToasts = state.toasts.filter((toast) => toast.id !== action.payload);
        return {
          ...state,
          toasts: updatedToasts,
        };
      default:
        return state;
  };
}
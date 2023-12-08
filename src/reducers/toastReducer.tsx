interface Toast {
    id;
    type: string; // Replace with the actual type
    message?: string;
  }
  
  interface ToastState {
    toasts: Toast[];
  }
  
  type ToastAction =
    | { type: "ADD_TOAST"; payload: Toast }
    | { type: "DELETE_TOAST"; payload }
    | { type: "UPDATE_TOAST"; payload };
  
  export const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
    console.log('Reducer Action:', action);
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
      case "UPDATE_TOAST":
        const updatedToast = state.toasts.map((toast) =>
            toast.id === action.payload.id
                ? { ...toast, ...action.payload}
                : toast
        );
        return {
          ...state,
          toasts: updatedToast
        }
      default:
        return state;
  };
}
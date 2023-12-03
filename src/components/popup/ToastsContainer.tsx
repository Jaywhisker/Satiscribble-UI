import React from 'react';
import Toast from './Toast';


const ToastsContainer = ({ toasts }) => {
  return (
    <div className="toasts-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastsContainer;

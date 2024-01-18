import React from "react";
import Toast from "./Toast";
import styles from "@/styles/components/popups.module.css";

const ToastsContainer = ({ toasts }) => {
  // console.log('Toasts in ToastsContainer: ', toasts);

  return (
    <div className={styles.toastsContainer}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastsContainer;

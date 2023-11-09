import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from 'src/styles/buttons.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  iconSize?: 'small' | 'large';
  fillBorderVariant?: 'fill' | 'border' | 'no-background';
  buttonType?: 'button' | 'icon-button';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  hasLeftIcon?: boolean;
  hasText?: boolean; 
  hasRightIcon?: boolean;
  swapIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  fillBorderVariant = 'fill',
  buttonType = 'button',
  leftIcon,
  iconSize = 'medium',
  rightIcon,
  hasLeftIcon = true,
  hasText = true,
  hasRightIcon = false,
  swapIcon,
  children,
  ...rest
}) => {
    const getButtonClass = () => `${styles[buttonType]} ${styles[buttonType]}-${size} ${styles[fillBorderVariant]}`;

  return (
    <button className={getButtonClass()} {...rest}>
      {hasLeftIcon && leftIcon && <span className="left-icon">{leftIcon}</span>}
      {hasText && children && <span className={`${styles['button-text']} ${styles[fillBorderVariant + '-text']}`}>{children}</span>}
      {hasRightIcon && rightIcon && <span className="right-icon">{rightIcon}</span>}
      {swapIcon && <span className={`swap-icon-${size}`}>{swapIcon}</span>}
    </button>
  );
};

export default Button;

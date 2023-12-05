import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from 'src/styles/components/buttons.module.css';

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
  colorVariant?: 'purple' | 'white' | 'red';
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
  colorVariant = 'purple',
  children,
  ...rest
}) => {
  const getButtonClass = () => {
    const sizeClass = styles[buttonType + '-' + size];
    const colorStyle = fillBorderVariant === 'no-background' ? styles['no-background'] : styles[colorVariant + '-' + fillBorderVariant];
    return `${styles[buttonType]} ${sizeClass} ${colorStyle}`;
  };

    const getTextColorClass = () => {
      if (colorVariant === 'white') {
        return styles['white-text'];
      } else if (colorVariant === 'red') {
        return styles['white-text'];
      }
      return '';
    };
    

  return (
    <button className={`${getButtonClass()}`} {...rest}>
      {hasLeftIcon && leftIcon && <span>{leftIcon}</span>}
      {hasText && children && <span className={`${styles['button-text']} ${styles[fillBorderVariant + '-text']} ${getTextColorClass()}`}>{children}</span>}
      {hasRightIcon && rightIcon && <span>{rightIcon}</span>}
      {swapIcon && <span className={`swap-icon-${size}`}>{swapIcon}</span>}
    </button>
  );
};

export default Button;

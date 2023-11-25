import React from 'react';

interface IconProps {
  name: string;
  alt: string;
  color?: 'white' | 'orange' | 'red' | 'purple';
  size?: 'small' | 'medium' | 'large';
}

const getIconPath = (color: string, icon: string, size: string) => {
  return `/icons/${color}/${icon}-${size}.svg`;
};

export const CancelIcon: React.FC<IconProps> = ({ alt, color = 'white', size = 'small', name = 'cancel' }) => (
  <img src={getIconPath(color, 'cancel', size)} alt={alt} />
);

export const NotificationIcon: React.FC<IconProps> = ({ alt, color = 'white', size = 'small', name = 'notification'}) => (
  <img src={getIconPath(color, 'notification', size)} alt={alt} />
);

export const ExclamationIcon: React.FC<IconProps> = ({ alt, color = 'white', size = 'small', name = 'exclamation' }) => (
  <img src={getIconPath(color, 'exclamation', size)} alt={alt} />
);

export const CheckIcon: React.FC<IconProps> = ({ alt, color = 'white', size = 'small', name = 'check' }) => (
  <img src={getIconPath(color, 'check', size)} alt={alt} />
);

export const GeneralIcon: React.FC<IconProps> = ({ alt, color = 'white', size = 'small', name ='check'}) => (
  <img src={getIconPath(color, name , size)} alt={alt} />
);

const Icons = {
  CancelIcon,
  NotificationIcon,
  ExclamationIcon,
  CheckIcon,
  GeneralIcon
};

export default Icons;

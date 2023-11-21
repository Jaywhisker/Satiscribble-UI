import React from 'react';

interface IconProps {
  alt: string;
}

export const CancelIcon: React.FC<IconProps> = ({ alt }) => (
  <img src="/icons/white/cancel-small.svg" alt={alt} />
);

export const NotificationIcon: React.FC<IconProps> = ({ alt }) => (
  <img src="icons/orange/notification-small.svg" alt={alt} />
);

export const ExclamationIcon: React.FC<IconProps> = ({ alt }) => (
  <img src="icons/red/exclamation-small.svg" alt={alt} />
);

export const CheckIcon: React.FC<IconProps> = ({ alt }) => (
  <img src="icons/purple/check-small.svg" alt={alt} />
);



const Icons = {
  CancelIcon,
  NotificationIcon,
  ExclamationIcon,
  CheckIcon
};

export default Icons;
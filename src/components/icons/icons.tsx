import React from 'react';
import styles from '@/styles/components/popups.module.css';

interface IconProps {
  name?: string;
  alt: string;
  color?: 'white' | 'orange' | 'red' | 'purple'| 'green';
  size?: 'small' | 'medium' | 'large';
}

const getIconPath = (color: string, icon: string, size: string) => {
  return `/icons/${color}/${icon}-${size}.svg`;
};


export const GeneralIcon: React.FC<IconProps> = ({ alt, color = 'white', size = 'small', name ='check'}) => (
  <img className={styles.iconSize} src={getIconPath(color!, name! , size!)} alt={alt} />
);

const Icons = {
  GeneralIcon
};

export default Icons;

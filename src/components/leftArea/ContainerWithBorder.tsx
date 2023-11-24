import React from 'react';
import styles from '@/styles/components/leftSideBar.module.css';

// Temporary container component, will require one that retrives data from database

interface ContainerWithBorderProps {
  text: string;
}

const ContainerWithBorder: React.FC<ContainerWithBorderProps> = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.styledContainer}>
        {text}
      </div>
    </div>
  );
};

export default ContainerWithBorder;
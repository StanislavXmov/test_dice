import React from 'react'

import styles from './OutcomeTable.module.scss';

import ResetIcon from '../icons/reset2.svg?react';

interface ButtonProps {
  cb: () => void;
}

export const ResetButton = ({ cb }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={cb}
    >
      <ResetIcon className={styles.icon} />
    </button>
  );
}

export const OutcomeTable = () => {

  const resetHandler = () => {
    
  }

  return (
    <div className={styles.layer}>
      <ResetButton cb={resetHandler} />
      <div className={styles.headerWrapper}>
        <h2 className={styles.title}>Таблица исходов</h2>
      </div>
    </div>
  )
}

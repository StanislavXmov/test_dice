import React from 'react';

import styles from './ResetButton.module.scss';

import ResetIcon from '../icons/reset.svg?react';

interface ButtonProps {
  cb: () => void;
}

export const ResetButton = ({cb}: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={cb}
    >
      <ResetIcon className={styles.icon} />
    </button>
  );
}

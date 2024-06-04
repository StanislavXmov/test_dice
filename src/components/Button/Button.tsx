import { useRef } from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  title: string;
  cb: () => void;
  disabled: boolean;
  setDisabled: (v: boolean) => void;
  timeout: number;
}

export const Button = ({title, cb, disabled, setDisabled, timeout}: ButtonProps) => {
  const timer = useRef<number>(null)

  const handler = () => {
    setDisabled(true);
    cb();

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setDisabled(false);
    }, timeout);
  }

  return (
    <button
      className={styles.button}
      onClick={handler}
      disabled={disabled}
    >
      {title}
    </button>
  )
}


import { useEffect, useRef } from 'react';
import { useRoleDiceButton } from '../../state/useRoleDiceButton';

import styles from './Button.module.scss';

interface ButtonProps {
  tittle: string;
  cb: () => void;
}

export const Button = ({tittle, cb}: ButtonProps) => {
  const disabled = useRoleDiceButton(s => s.disabled);
  const setDisabled = useRoleDiceButton(s => s.setDisabled);

  const timer = useRef<number>(null)

  const handler = () => {
    setDisabled(true);
    cb();

    timer.current = setTimeout(() => {
      setDisabled(false);
    }, 3000);
  }

  useEffect(() => {
    if (disabled && timer.current) {
      clearTimeout(timer.current);
    }
  }, [disabled]);

  return (
    <button
      className={styles.button}
      onClick={handler}
      disabled={disabled}
    >
      {tittle}
    </button>
  )
}


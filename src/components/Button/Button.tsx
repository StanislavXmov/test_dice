import styles from './Button.module.scss';

interface ButtonProps {
  tittle: string;
  cb: () => void;
}

export const Button = ({tittle, cb}: ButtonProps) => {
  return (
    <button className={styles.button} onClick={cb}>{tittle}</button>
  )
}


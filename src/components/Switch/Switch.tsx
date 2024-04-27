import styles from './Switch.module.scss';

export type SwitchType = 'List' | 'Graph';

export const Switch = ({onChange, type} : {onChange: (v: SwitchType) => void, type: SwitchType}) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.button} ${type === 'List' ? styles.active: ''}`}
        type="button"
        onClick={() => onChange('List')}
      >
        списком
      </button>
      <button
        className={`${styles.button} ${type === 'Graph' ? styles.active: ''}`}
        type="button"
        onClick={() => onChange('Graph')}
      >
        на графике
      </button>
    </div>
  )
}

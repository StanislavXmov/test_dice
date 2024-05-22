import { ChangeEvent, useState } from 'react';

import { useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Range.module.scss';

export const LengthRange = ({max, min}: {max: number, min: number}) => {
  const [value, setValue] = useState(0);
  const setLength = useDiceSeries(s => s.setLength);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    setLength(Number(e.target.value));
  }

  return (
    <div className={styles.inputWraper}>
      <span className={styles.labelValue}>{min}</span>
      <input
        className={styles.input}
        type="range"
        value={value}
        min={min}
        max={max}
        step={1}
        onChange={handler}
      />
      <span className={styles.labelValue}>{max}</span>
    </div>
  );
};

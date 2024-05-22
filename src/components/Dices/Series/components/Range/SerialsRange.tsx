import { ChangeEvent, useState } from 'react';
import { useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Range.module.scss';

export type CounterType = 2|5|10|25|50|100;

export const SerialsRange = ({max, min}: {max: number, min: number}) => {
  const [value, setValue] = useState(0);
  const setSeriesN = useDiceSeries(s => s.setSeriesN);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    setSeriesN(Number(e.target.value));
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

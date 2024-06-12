import { ChangeEvent, useState } from 'react';
import { useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Range.module.scss';

export type CounterType = 2|5|10|25|50|100;

const toCaseCount = (arg: number) => {
  let titles = ['серии', 'серий', 'серий'];
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(arg % 100 > 4 && arg % 100 < 20) ? 2 : cases[Math.min(arg % 10, 5)]];
}

export const SerialsRange = ({max, min}: {max: number, min: number}) => {
  const [value, setValue] = useState(2);
  const setSeriesN = useDiceSeries(s => s.setSeriesN);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    setSeriesN(Number(e.target.value));
  }
  return (
    <div className={styles.controlWrapper}>
      <span className={styles.text}>{`из ${value} ${toCaseCount(value)}`}</span>
      <input
        className={`${styles.inputControll} ${styles.inputLength}`}
        type="range"
        value={value}
        min={min}
        max={max}
        step={1}
        onChange={handler}
      />
    </div>
  );
};

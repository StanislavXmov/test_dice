import { ChangeEvent, useState } from 'react';
import { useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Range.module.scss';

export type CounterType = 2|5|10|25|50|100;

const toCaseCount = (arg: number) => {
  let titles = ['серии', 'серий', 'серий'];
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(arg % 100 > 4 && arg % 100 < 20) ? 2 : cases[Math.min(arg % 10, 5)]];
}

export const SerialsRange = () => {
  const min = 10;
  const max = 580;
  const [value, setValue] = useState(90);
  const setSeriesN = useDiceSeries(s => s.setSeriesN);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (v > 80) {
      setValue(Number(v));
      setSeriesN(Number(v - 80));
    } else {
      setValue(Number(v));
      setSeriesN(Number(v / 10 + 1));
    }
  }
  return (
    <div className={styles.controlWrapper}>
      {value > 80 && <span className={styles.text}>{`из ${value - 80} ${toCaseCount(value - 80)}`}</span>}
      {value <= 80 && <span className={styles.text}>{`из ${value / 10 + 1} ${toCaseCount(value / 10 + 1)}`}</span>}
      <input
        className={`${styles.inputControll} ${styles.inputLength}`}
        type="range"
        value={value}
        min={min}
        max={max}
        step={10}
        onChange={handler}
      />
    </div>
  );
};

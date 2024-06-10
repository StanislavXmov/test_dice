import { ChangeEvent, useEffect, useState } from 'react';

import { useCoinSeries } from '../../../../../state/useCoinSeries';

import styles from './Range.module.scss';

const toCaseCount = (arg: number) => {
  let titles = ['раз', 'раза', 'раз'];
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(arg % 100 > 4 && arg % 100 < 20) ? 2 : cases[Math.min(arg % 10, 5)]];
}

export const KRange = () => {
  const [value, setValue] = useState(0);
  const setK = useCoinSeries(s => s.setK);
  const length = useCoinSeries(s => s.length);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    setK(Number(e.target.value));
  }

  useEffect(() => {
    console.log(length);
    if (value > length) {
      setValue(length);
      setK(length);
    }
    
  }, [length]);

  return (
    <div className={styles.controlWrapper}>
      <div className={styles.labelWrapper}>
        <span className={styles.symbol}>k</span>
        <span className={styles.text}>= {value} {toCaseCount(value)}</span>
      </div>
      <input
        className={`${styles.inputControll} ${styles.inputLength}`}
        type="range"
        value={value}
        min={0}
        max={length}
        step={1}
        onChange={handler}
      />
    </div>
  );
};

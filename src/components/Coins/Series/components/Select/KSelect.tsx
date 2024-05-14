import { ChangeEvent } from 'react';
import { useCoinSeries } from '../../../../../state/useCoinSeries';

import styles from './Select.module.scss'

export const KSelect = () => {
  const setK = useCoinSeries(s => s.setK);
  const length = useCoinSeries(s => s.length);

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setK(Number(e.target.value));
  }
  return (
    <label className={styles.label} htmlFor="KSelect">
      {`выпала:`}
      <select
        id='KSelect'
        className={styles.select}
        onChange={selectHandler}
        defaultValue={1}
      >
        {new Array(length).fill(null).map((_, i) => (
          <option key={i} value={i + 1}>{i + 1}</option>
        ))}
      </select>
    </label>
  );
}

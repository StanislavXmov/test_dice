import { ChangeEvent } from 'react';
import { useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Select.module.scss'

export const KSelect = () => {
  const setK = useDiceSeries(s => s.setK);
  const length = useDiceSeries(s => s.length);

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setK(Number(e.target.value));
  }
  return (
    <label className={styles.label} htmlFor="KSelectDice">
      {`выпало:`}
      <select
        id='KSelectDice'
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

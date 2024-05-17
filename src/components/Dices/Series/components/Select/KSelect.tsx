import { ChangeEvent } from 'react';
import { useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Select.module.scss';

const titles: Record<string, string> = {
  '1': '1 раз',
  '2': '2 раза',
  '3': '3 раза',
  '4': '4 раза',
  '5': '5 раз',
  '6': '6 раз',
  '7': '7 раз',
  '8': '8 раз',
  '9': '9 раз',
  '10': '10 раз',
  '11': '11 раз',
  '12': '12 раз',
  '13': '13 раз',
  '14': '14 раз',
  '15': '15 раз',
}

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
          <option key={i} value={i + 1}>{titles[i + 1]}</option>
        ))}
      </select>
    </label>
  );
}

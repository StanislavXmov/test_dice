import { ChangeEvent } from 'react';
import { useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Select.module.scss';

const titles: Record<string, string> = {
  '1': 'одно очко',
  '2': 'два очка',
  '3': 'три очка',
  '4': 'четыре очка',
  '5': 'пять очков',
  '6': 'шесть очков',
  '7': 'семь очков',
  '8': 'восемь очков',
  '9': 'девять очков',
  '10': 'десять очков',
  '11': 'одиннадцать очков',
  '12': 'двенадцать очков',
}

export const PointSelect = () => {
  const edge = useDiceSeries(s => s.edge);
  const setPoint = useDiceSeries(s => s.setPoint);

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPoint(Number(e.target.value));
  }
  return (
    <label className={styles.label} htmlFor="PointSelect">
      <select
        id='PointSelect'
        className={styles.pointSelect}
        onChange={selectHandler}
        defaultValue={1}
      >
        {new Array(edge).fill(null).map((_, i) => (
          <option key={i} value={i + 1}>{titles[i + 1]}</option>
        ))}
      </select>
    </label>
  );
}

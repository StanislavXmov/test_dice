import { ChangeEvent } from 'react';
import { useDiceSeries, Edge } from '../../../../../state/useDiceSeries';

import styles from './Select.module.scss'

export const EdgeSelect = () => {
  const setEdge = useDiceSeries(s => s.setEdge);

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setEdge(Number(e.target.value) as Edge);
  }
  return (
    <label className={styles.label} htmlFor="EdgeSelect">
      <select
        id='EdgeSelect'
        className={styles.select}
        onChange={selectHandler}
        defaultValue={6}
      >
        <option value={6}>{'для 6-гранного кубика'}</option>
        <option value={8}>{'для 8-гранного кубика'}</option>
        <option value={12}>{'для 12-гранного кубика'}</option>
      </select>
    </label>
  );
}

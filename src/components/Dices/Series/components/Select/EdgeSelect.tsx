import { ChangeEvent } from 'react';
import { useDiceSeries, Edge } from '../../../../../state/useDiceSeries';

import styles from './Select.module.scss'

export const EdgeSelect = () => {
  const setEdge = useDiceSeries(s => s.setEdge);

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setEdge(Number(e.target.value) as Edge);
  }
  return (
    <label className={styles.edgeLabel} htmlFor="KSelect">
      {`Граней`}
      <select
        id='EdgeSelect'
        className={styles.edgeSelect}
        onChange={selectHandler}
        defaultValue={6}
      >
        <option value={6}>{6}</option>
        <option value={8}>{8}</option>
        <option value={12}>{12}</option>
      </select>
    </label>
  );
}

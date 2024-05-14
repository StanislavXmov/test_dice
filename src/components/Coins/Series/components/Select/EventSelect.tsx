import { ChangeEvent } from 'react';
import { Coin, useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Select.module.scss'

export const EventSelect = () => {
  const setEvent = useDiceSeries(s => s.setEvent);
  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setEvent(e.target.value as Coin);
  }
  return (
    <label className={styles.label} htmlFor="EventSelect">
      Событие:
      <select
        id='EventSelect'
        className={styles.select}
        onChange={selectHandler}
        defaultValue={'5'}
      >
        <option value={'OREL'}>Орёл</option>
        <option value={'5'}>Решка</option>
      </select>
    </label>
  );
}

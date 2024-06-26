import { ChangeEvent } from 'react';
import { Coin, useCoinSeries } from '../../../../../state/useCoinSeries';

import styles from './Select.module.scss'

export const EventSelect = () => {
  const setEvent = useCoinSeries(s => s.setEvent);
  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setEvent(e.target.value as Coin);
  }
  return (
    <label className={styles.label} htmlFor="EventSelect">
      <select
        id='EventSelect'
        className={styles.select}
        onChange={selectHandler}
        defaultValue={'5'}
      >
        <option value={'OREL'}>орёл выпал</option>
        <option value={'5'}>решка выпала</option>
      </select>
    </label>
  );
}

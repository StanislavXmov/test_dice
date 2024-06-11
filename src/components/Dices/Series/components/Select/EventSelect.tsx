import { ChangeEvent } from 'react';
import {EventDice, useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Select.module.scss'

export const EventSelect = () => {
  const setEvent = useDiceSeries(s => s.setEvent);
  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setEvent(e.target.value as EventDice);
  }
  return (
    <label className={styles.label} htmlFor="EventSelectDice">
      <select
        id='EventSelectDice'
        className={styles.select}
        onChange={selectHandler}
        defaultValue={'='}
      >
        <option value={'='}>ровно</option>
        <option value={'>'}>больше</option>
        <option value={'<'}>меньше</option>
      </select>
    </label>
  );
}

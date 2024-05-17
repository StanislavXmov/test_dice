import { ChangeEvent, useState } from 'react';
import { useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Range.module.scss';

const labes = [
  {inputValue: 0, id: 0, labelValue: 2},
  {inputValue: 1, id: 1, labelValue: 5},
  {inputValue: 2, id: 2, labelValue: 10},
  {inputValue: 3, id: 3, labelValue: 25},
  {inputValue: 4, id: 4, labelValue: 50},
  {inputValue: 5, id: 5, labelValue: 100},
];

export type CounterType = 2|5|10|25|50|100;

export const SerialsRange = () => {
  const [value, setValue] = useState(0);
  const setSeriesN = useDiceSeries(s => s.setSeriesN);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    const counter = labes[Number(e.target.value)].labelValue;
    setSeriesN(counter as CounterType);
  }
  return (
    <div className={styles.inputWraper}>
      <input
        className={styles.input}
        type="range"
        value={value}
        min={0}
        max={5}
        step={1}
        onChange={handler}
      />
      <div className={styles.label} >
        {labes.map(({id, inputValue, labelValue}) => (
          <span
          key={id}
          className={`${styles.labelValue} ${styles[`labelSerialsValue${id}`]} ${ value === inputValue ? styles.lavelActive : ''}`}
          >
            {labelValue}
          </span>
          ))}
      </div>
    </div>
  );
};

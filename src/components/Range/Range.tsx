import { ChangeEvent, useState } from 'react';

import styles from './Range.module.scss';

const labes = [
  {inputValue: 0, id: 0, labelValue: 1},
  {inputValue: 1, id: 1, labelValue: 5},
  {inputValue: 2, id: 2, labelValue: 10},
  {inputValue: 3, id: 3, labelValue: 50},
  {inputValue: 4, id: 4, labelValue: 100},
  {inputValue: 5, id: 5, labelValue: 500},
  {inputValue: 6, id: 6, labelValue: 1000},
  {inputValue: 7, id: 7, labelValue: 5000},
  {inputValue: 8, id: 8, labelValue: 10000},
];

export type CounterType = 1|5|10|50|100|500|1000|5000|10000;

export const Range = ({setCounter}: {setCounter: (v: CounterType) => void}) => {
  const [value, setValue] = useState(0);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    const counter = labes[Number(e.target.value)].labelValue;
    setCounter(counter as CounterType);
  }
  return (
    <div className={styles.inputWraper}>
      <span className={styles.line} />
      <input
        className={styles.input}
        type="range"
        value={value}
        min={0}
        max={8}
        step={1}
        onChange={handler}
      />
      <span className={styles.line} />
      <div className={styles.label} >
        {labes.map(({id, inputValue, labelValue}) => (
          <span
          key={id}
          className={`${styles.labelValue} ${styles[`labelValue${id}`]} ${ value === inputValue ? styles.lavelActive : ''}`}
          >
            {labelValue}
          </span>
          ))}
      </div>
    </div>
  );
};

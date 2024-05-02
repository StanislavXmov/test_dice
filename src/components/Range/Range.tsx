import { ChangeEvent, useState } from 'react';

import styles from './Range.module.scss';

const labes = [
  {inputValue: 0, id: 0, labelValue: 5},
  {inputValue: 1, id: 1, labelValue: 10},
  {inputValue: 2, id: 2, labelValue: 50},
  {inputValue: 3, id: 3, labelValue: 100},
  {inputValue: 4, id: 4, labelValue: 500},
  {inputValue: 5, id: 5, labelValue: 1000},
];

export type CounterType = 5|10|50|100|500|1000;

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
        max={5}
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

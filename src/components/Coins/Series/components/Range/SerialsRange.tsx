import { ChangeEvent, useState } from 'react';
import { useCoinSeries } from '../../../../../state/useCoinSeries';

import styles from './Range.module.scss';

export type CounterType = 2|5|10|25|50|100;

const toCaseCount = (arg: number) => {
  let titles = ['серии', 'серий', 'серий'];
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(arg % 100 > 4 && arg % 100 < 20) ? 2 : cases[Math.min(arg % 10, 5)]];
}

export const SerialsRange = () => {
  const min = 10;
  const max = 580;
  const [value, setValue] = useState(90);
  const setSeriesN = useCoinSeries(s => s.setSeriesN);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (v > 80) {
      setValue(Number(v));
      setSeriesN(Number(v - 80));
    } else {
      setValue(Number(v));
      setSeriesN(Number(v / 10 + 1));
    }
  }
  return (
    <div className={styles.controlWrapper}>
      {value > 80 && <span className={styles.text}>{`из ${value - 80} ${toCaseCount(value - 80)}`}</span>}
      {value <= 80 && <span className={styles.text}>{`из ${value / 10 + 1} ${toCaseCount(value / 10 + 1)}`}</span>}
      <input
        className={`${styles.inputControll} ${styles.inputLength}`}
        type="range"
        value={value}
        min={min}
        max={max}
        step={10}
        onChange={handler}
      />
    </div>
  );
};

// const labes = [
//   {inputValue: 0, id: 0, labelValue: 2},
//   {inputValue: 1, id: 1, labelValue: 5},
//   {inputValue: 2, id: 2, labelValue: 10},
//   {inputValue: 3, id: 3, labelValue: 25},
//   {inputValue: 4, id: 4, labelValue: 50},
//   {inputValue: 5, id: 5, labelValue: 100},
// ];

// export type CounterType = 2|5|10|25|50|100;

// export const SerialsRange = () => {
//   const [value, setValue] = useState(0);
//   const setSeriesN = useCoinSeries(s => s.setSeriesN);

//   const handler = (e: ChangeEvent<HTMLInputElement>) => {
//     setValue(Number(e.target.value));
//     const counter = labes[Number(e.target.value)].labelValue;
//     setSeriesN(counter as CounterType);
//   }
//   return (
//     <div className={styles.inputWraper}>
//       <input
//         className={styles.input}
//         type="range"
//         value={value}
//         min={0}
//         max={5}
//         step={1}
//         onChange={handler}
//       />
//       <div className={styles.label} >
//         {labes.map(({id, inputValue, labelValue}) => (
//           <span
//           key={id}
//           className={`${styles.labelValue} ${styles[`labelSerialsValue${id}`]} ${ value === inputValue ? styles.lavelActive : ''}`}
//           >
//             {labelValue}
//           </span>
//           ))}
//       </div>
//     </div>
//   );
// };

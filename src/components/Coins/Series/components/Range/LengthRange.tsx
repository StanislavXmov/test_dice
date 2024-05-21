import { ChangeEvent, useState } from 'react';

import { useCoinSeries } from '../../../../../state/useCoinSeries';

import styles from './Range.module.scss';

export const LengthRange = ({max, min}: {max: number, min: number}) => {
  const [value, setValue] = useState(0);
  const setLength = useCoinSeries(s => s.setLength);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    setLength(Number(e.target.value));
  }

  return (
    <div className={styles.inputWraper}>
      <span className={styles.labelValue}>{min}</span>
      <input
        className={styles.input}
        type="range"
        value={value}
        min={min}
        max={max}
        step={1}
        onChange={handler}
      />
      <span className={styles.labelValue}>{max}</span>
    </div>
  );
};


// const labes = [
//   {inputValue: 0, id: 0, labelValue: 5},
//   {inputValue: 1, id: 1, labelValue: 10},
//   {inputValue: 2, id: 2, labelValue: 15},
// ];

// export const LengthRange = () => {
//   const [value, setValue] = useState(0);
//   const setLength = useCoinSeries(s => s.setLength);

//   const handler = (e: ChangeEvent<HTMLInputElement>) => {
//     setValue(Number(e.target.value));
//     const counter = labes[Number(e.target.value)].labelValue;
//     setLength(counter as Length)
//   }

//   return (
//     <div className={styles.inputWraper}>
//       <input
//         className={styles.input}
//         type="range"
//         value={value}
//         min={0}
//         max={2}
//         step={1}
//         onChange={handler}
//       />
//       <div className={styles.label} >
//         {labes.map(({id, inputValue, labelValue}) => (
//           <span
//           key={id}
//           className={`${styles.labelValue} ${styles[`labelLengthValue${id}`]} ${ value === inputValue ? styles.labelActive : ''}`}
//           >
//             {labelValue}
//           </span>
//           ))}
//       </div>
//     </div>
//   );
// };

import { ChangeEvent, useState } from 'react';
import { KaTeX } from '../../../../Katex/Katex';
import { useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Range.module.scss';

const toCaseCount = (arg: number) => {
  let titles = ['бросок', 'броска', 'бросков'];
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(arg % 100 > 4 && arg % 100 < 20) ? 2 : cases[Math.min(arg % 10, 5)]];
}

export const LengthRange = ({max, min}: {max: number, min: number}) => {
  const [value, setValue] = useState(5);
  const setLength = useDiceSeries(s => s.setLength);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    setLength(Number(e.target.value));
  }

  return (
    <div className={`${styles.controlWrapper} ${styles.width}`}>
      <div className={styles.labelWrapper}>
        <KaTeX
          texExpression={`n = ${value}`}
          className={styles.func}
        />
        <span className={styles.text}>{toCaseCount(value)}</span>
      </div>
      <input
        className={`${styles.inputControll} ${styles.inputLength}`}
        type="range"
        value={value}
        min={min}
        max={max}
        step={1}
        onChange={handler}
      />
    </div>
  );
};

// export const LengthRange = ({max, min}: {max: number, min: number}) => {
//   const [value, setValue] = useState(0);
//   const setLength = useDiceSeries(s => s.setLength);

//   const handler = (e: ChangeEvent<HTMLInputElement>) => {
//     setValue(Number(e.target.value));
//     setLength(Number(e.target.value));
//   }

//   return (
//     <div className={styles.inputWraper}>
//       <span className={styles.labelValue}></span>
//       <input
//         className={styles.input}
//         type="range"
//         value={value}
//         min={min}
//         max={max}
//         step={1}
//         onChange={handler}
//       />
//       <span className={styles.labelValue}>{max}</span>
//     </div>
//   );
// };
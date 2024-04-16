import { ChangeEvent, useState } from 'react';

import styles from './Range.module.scss';

export const Range = () => {
  const [value, setValue] = useState(0);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  }
  return (
    <div className={styles.inputWraper}>
      <span className={styles.line} />
      <input
        className={styles.input}
        type="range"
        value={value}
        min={0}
        max={6}
        step={1}
        onChange={handler}
      />
      <span className={styles.line} />
    </div>
  );
};

import React from 'react';
import { LengthRange } from './components/Range/LengthRange';
import { useDiceSeries } from '../../../state/useDiceSeries';

import styles from './Series.module.scss';

export const DiceSeries = () => {
  const length = useDiceSeries(s => s.length);
  return (
    <div className={styles.wrapper}>
      {length}
      <h2 className={styles.title}>Серии бросков монеты</h2>
      <div className={styles.controllWrapper}>
        <div>
          <h3 className={styles.subTitle}>Длина серии n</h3>
          <LengthRange />
        </div>
        
      </div>
    </div>
  )
}

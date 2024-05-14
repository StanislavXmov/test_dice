import React from 'react';
import { LengthRange } from './components/Range/LengthRange';
import { SerialsRange } from './components/Range/SerialsRange';
import { useDiceSeries } from '../../../state/useDiceSeries';

import styles from './Series.module.scss';

export const DiceSeries = () => {
  const length = useDiceSeries(s => s.length);
  const seriesN = useDiceSeries(s => s.seriesN);
  return (
    <div className={styles.wrapper}>
      {`length: ${length}, seriesN: ${seriesN}`}
      <h2 className={styles.title}>Серии бросков монеты</h2>
      <div className={styles.controllWrapper}>
        <div>
          <h3 className={styles.subTitle}>Длина серии n</h3>
          <LengthRange />
        </div>
        <div>
          <h3 className={styles.subTitle}>Количество серий</h3>
          <SerialsRange />
        </div>
      </div>
    </div>
  )
}

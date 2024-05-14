import { useState } from 'react';
import { LengthRange } from './components/Range/LengthRange';
import { SerialsRange } from './components/Range/SerialsRange';
import { useDiceSeries } from '../../../state/useDiceSeries';
import { Button } from '../../Button/Button';
import { EventSelect } from './components/Select/EventSelect';
import { KSelect } from './components/Select/KSelect';

import styles from './Series.module.scss';

export const DiceSeries = () => {
  const [disabled, setDisabled] = useState(false);
  const length = useDiceSeries(s => s.length);
  const seriesN = useDiceSeries(s => s.seriesN);
  const event = useDiceSeries(s => s.event);
  const k = useDiceSeries(s => s.k);

  const startHandler = () => {
    console.log('START');
  }

  return (
    <div className={styles.wrapper}>
      {`length: ${length}, seriesN: ${seriesN}, event: ${event}, k: ${k}`}
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
        <Button
          title={`Запустить`}
          disabled={disabled}
          cb={startHandler}
          setDisabled={setDisabled}
          timeout={1000}
        />
      </div>
      <div className={styles.controllWrapper}>
        <div>
          <EventSelect />
        </div>
        <div>
          <KSelect />
        </div>
      </div>
    </div>
  )
}

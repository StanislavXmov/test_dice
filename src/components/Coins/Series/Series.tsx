import { useState } from 'react';
import { LengthRange } from './components/Range/LengthRange';
import { SerialsRange } from './components/Range/SerialsRange';
import { Coin, useCoinSeries } from '../../../state/useCoinSeries';
import { Button } from '../../Button/Button';
import { EventSelect } from './components/Select/EventSelect';
import { KSelect } from './components/Select/KSelect';

import Coin1 from '../../icons/coin_1.svg?react';
import Coin2 from '../../icons/coin_2.svg?react';

import styles from './Series.module.scss';

const test: Coin[] = [
  '5',
  'OREL',
  '5',
  '5',
  '5'
];

export const DiceSeries = () => {
  const [disabled, setDisabled] = useState(false);
  const length = useCoinSeries(s => s.length);
  const seriesN = useCoinSeries(s => s.seriesN);
  const event = useCoinSeries(s => s.event);
  const k = useCoinSeries(s => s.k);

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
      <div className={styles.listWrapper}>
        {/* test */}
        <div className={`${styles.list} ${styles.activeList}`}>
          <div className={styles.itemsWrapper}>
            {test.map((c, i) => (
              <div key={i}>
                {c === 'OREL' ? <Coin1 className={styles.coinIcon} /> : <Coin2 className={styles.coinIcon} />}
              </div>
            ))}
          </div>
          <span className={styles.listInfo}>успешная серия</span>
        </div>
      </div>
    </div>
  )
}

const coins = {
  'OREL': <Coin1 className={styles.coinIcon} />,
  '5': <Coin2 className={styles.coinIcon} />,
  '?': <span className={styles.coinIcon} >?</span>,
}
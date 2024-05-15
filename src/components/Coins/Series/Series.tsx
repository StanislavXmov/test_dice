import { useState } from 'react';
import random from 'random';
import { LengthRange } from './components/Range/LengthRange';
import { SerialsRange } from './components/Range/SerialsRange';
import { Coin, useCoinSeries } from '../../../state/useCoinSeries';
import { Button } from '../../Button/Button';
import { EventSelect } from './components/Select/EventSelect';
import { KSelect } from './components/Select/KSelect';

import Coin1 from '../../icons/coin_1.svg?react';
import Coin2 from '../../icons/coin_2.svg?react';

import styles from './Series.module.scss';

const factorial = (n: number): number => {
  if (n < 0) {
    return -1;
  } else if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

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
  const series = useCoinSeries(s => s.series);
  const setSeries = useCoinSeries(s => s.setSeries);

  console.log(series);
  

  const startHandler = () => {
    const seriesList: Coin[][] = [];
    for (let i = 0; i < seriesN; i++) {
      const list: Coin[] = [];
      for (let j = 0; j < length; j++) {
        const n = random.int(0, 1);
        if (n === 1) {
          list.push('OREL');
        } else {
          list.push('5');
        }
      }
      seriesList.push(list);
    }

    setSeries(seriesList);
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
        {series.map((s, i) => (
          <div key={i} className={`${styles.list} ${''}`}>
            <div className={styles.itemsWrapper}>
              {s.map((c, i) => (
                <div key={i}>
                  {c === 'OREL' ? <Coin1 className={styles.coinIcon} /> : <Coin2 className={styles.coinIcon} />}
                </div>
              ))}
            </div>
            {/* <span className={styles.listInfo}>успешная серия</span> */}
          </div>
        ))}
        
        {/* <div className={`${styles.list} ${styles.activeList}`}>
          <div className={styles.itemsWrapper}>
            {test.map((c, i) => (
              <div key={i}>
                {c === 'OREL' ? <Coin1 className={styles.coinIcon} /> : <Coin2 className={styles.coinIcon} />}
              </div>
            ))}
          </div>
          <span className={styles.listInfo}>успешная серия</span>
        </div> */}
      </div>
      <div className={styles.infoWrapper}>
        <div>
          <div className={styles.infoLabel}>
            Теоретическая вероятность события по формуле Бернулли
          </div>
          <div className={styles.info}>
            <span>P{' '}<sup>k</sup><sub>n</sub>={' '}</span><span>P{' '}<sup>5</sup><sub>10</sub>={' '}</span>
            <span>C{' '}<sup>5</sup><sub>10</sub></span><span>0.5<sup>5</sup></span><span>0.5<sup>10 - 5</sup>≈{' '}0.26</span>
          </div>
        </div>
        <div>
          <div className={styles.infoLabel}>
            Доля успешных серий в эксперименте
          </div>
          <div className={styles.info}>
            <span>P{' '}<sub>эксп</sub>={' '}</span><span>0 / 2 ={' '}0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

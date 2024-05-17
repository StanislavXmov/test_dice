import { useState } from 'react';
import random from 'random';
import { Length, useDiceSeries } from '../../../state/useDiceSeries';
import { LengthRange } from './components/Range/LengthRange';
import { SerialsRange } from './components/Range/SerialsRange';
import { Button } from '../../Button/Button';
import { EventSelect } from './components/Select/EventSelect';
import { KSelect } from './components/Select/KSelect';

import Coin1 from '../../icons/coin_1.svg?react';
import Coin2 from '../../icons/coin_2.svg?react';

import styles from './Series.module.scss';
import { EdgeSelect } from './components/Select/EdgeSelect';
import { PointSelect } from './components/Select/PointSelect';

const factorial = (n: number): number => {
  if (n < 0) {
    return -1;
  } else if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

const calc = (k: number, n: Length) => {
  const c = factorial(n) / (factorial(k) * factorial(n - k));
  return c * Math.pow(0.5, k) * Math.pow(0.5, n - k);
}

// const match = (event: Coin, k: number, list: Coin[]) => {
//   let count = 0;
//   list.forEach(c => {
//     if (c === event) {
//       count++;
//     }
//   });

//   if (count === k) {
//     return true;
//   } else {
//     return false;
//   }
// }

const match = () => true;

export const DiceSeries = () => {
  const [disabled, setDisabled] = useState(false);
  const edge = useDiceSeries(s => s.edge);
  const length = useDiceSeries(s => s.length);
  const seriesN = useDiceSeries(s => s.seriesN);
  const event = useDiceSeries(s => s.event);
  const k = useDiceSeries(s => s.k);
  const point = useDiceSeries(s => s.point);
  const series = useDiceSeries(s => s.series);
  const setSeries = useDiceSeries(s => s.setSeries);

  console.log(series);
  

  const startHandler = () => {
    const seriesList: number[][] = [];
    for (let i = 0; i < seriesN; i++) {
      const list: number[] = [];
      for (let j = 0; j < length; j++) {
        // const n = random.int(0, 1);
        // if (n === 1) {
        //   list.push('OREL');
        // } else {
        //   list.push('5');
        // }
      }
      seriesList.push(list);
    }

    setSeries([]);

    setTimeout(() => {
      setSeries(seriesList);
    }, 500);
  }

  const findedMatch = () => {
    let counter = 0;
    series.forEach(s => {
      // if (match(event, k, s)) {
      //   counter++;
      // }
    });
    return counter;
  }

  return (
    <div className={styles.wrapper}>
      {`edge: ${edge},length: ${length}, seriesN: ${seriesN}, event: ${event},point ${point}, k: ${k}`}
      <h2 className={styles.title}>Серии бросков кубика</h2>
      <div className={styles.controllWrapper}>
        <EdgeSelect />
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
          timeout={500}
        />
      </div>
      <div className={styles.controllWrapper}>
        <div>
          <EventSelect />
        </div>
        <div>
          <PointSelect />
        </div>
        <div>
          <KSelect />
        </div>
      </div>
      <div className={styles.listWrapper}>
        {series.map((s, i) => (
          <div key={i} className={`${styles.list} ${match() ? styles.activeList : ''}`}>
            <div className={styles.itemsWrapper}>
              {s.map((c, i) => (
                <div key={i}>
                  {/* {c === 'OREL' ? <Coin1 className={styles.coinIcon} /> : <Coin2 className={styles.coinIcon} />} */}
                </div>
              ))}
            </div>
            {/* {match(event, k, s) && <span className={styles.listInfo}>успешная серия</span>} */}
          </div>
        ))}
      </div>
      <div className={styles.infoWrapper}>
        <div>
          <div className={styles.infoLabel}>
            Теоретическая вероятность события по формуле Бернулли
          </div>
          <div className={styles.info}>
            <span className={styles.d} style={{width: '24px'}}>
              <span className={styles.dValue}>P</span>
              <span className={styles.sup}>k</span>
              <span className={styles.sub}>n</span>
            </span>
            <span style={{width: '16px'}}>=</span>
            <span className={styles.d} style={{width: length >= 10 ? '28px' : '24px'}}>
              <span className={styles.dValue}>P</span>
              <span className={styles.sup}>{k}</span>
              <span className={styles.sub}>{length}</span>
            </span>
            <span style={{width: '16px'}}>=</span>
            <span className={styles.d} style={{width: length >= 10 ? '28px' : '24px'}}>
              <span className={styles.dValue}>C</span>
              <span className={styles.sup}>{k}</span>
              <span className={styles.sub}>{length}</span>
            </span>
            <span className={styles.value}>0.5</span>
            <span className={styles.dWithoutValue} style={{width: k >= 10 ? '16px' : '12px'}}>
              <span className={styles.supWithoutValue}>{k}</span>
            </span>
            <span className={styles.value}>0.5</span>
            <span className={styles.dWithoutValue} style={{width: k >= 10 ? '16px' : '12px'}}>
              <span className={styles.supWithoutValue}>{`${length} - ${k}`}</span>
            </span>
            <span style={{width: (k >= 10 || length >= 10) ? '28px' : '22px', textAlign: 'right', marginRight: '4px'}}>≈</span>
            <span className={styles.value}>{calc(k, length).toFixed(2)}</span>
          </div>
        </div>
        <div>
          <div className={styles.infoLabel}>
            Доля успешных серий в эксперименте
          </div>
          <div className={styles.info}>
            <span className={styles.d} style={{width: length >= 10 ? '28px' : '24px'}}>
              <span className={styles.dValue}>P</span>
              <span className={styles.sub}>{'эксп'}</span>
            </span>
            <span className={styles.value} style={{width: '20px', textAlign: 'right', marginRight: '4px'}}>=</span>
            {findedMatch() > 0 && (
              <span className={styles.value}>{findedMatch()} / {series.length} ={' '}{findedMatch() / series.length}</span>
            )}
            {findedMatch() === 0 && (
              <span className={styles.value}>0</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

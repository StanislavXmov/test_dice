import React from 'react'
import { Coin, useCoinValue } from '../../../state/useCoinValue';

import Coin1 from '../../icons/coin_1.svg?react';
import Coin2 from '../../icons/coin_2.svg?react';

import styles from './CoinsGraph.module.scss';

const sortValues = (values: Coin[]) => {
  const o = {
    'OREL': 2,
    '5': 1,
    '?': 0,
  }
  const sort = (a: Coin, b: Coin) => {
    if (o[a] < o[b]) {
      return 1;
    } else if (o[a] > o[b]) {
      return -1;
    }
    return 0;
  }
  
  return [...values].sort(sort);
}

const getMappedValues = (values: Coin[]) => {
  const o: Record<Coin, number> = {
    'OREL': 0,
    '5': 0,
    '?': 0,
  }

  values.forEach(v => {
    o[v] += 1;
  });

  return o;
}

const height = 226;
const width = 96;
const padding1 = 5;
const rectHeight = 10;
const rectWidth = 30;

const Rect = ({x, y}: {x: number, y: number}) => {
  return (
    <rect x={x} y={y} width={rectWidth} height={rectHeight} fill="#09CA9B"/>
  );
}

// <rect y="22" width="30" height="10" fill="#09CA9B"/>
// <rect x="38" y="22" width="30" height="10" fill="#09CA9B"/>
// <rect x="38" y="11" width="30" height="10" fill="#09CA9B"/>
// <rect x="38" width="30" height="10" fill="#09CA9B"/>


export const CoinsGraph = () => {
  const values = useCoinValue(s => s.values);
  const sortedValues = sortValues(values);
  const valuesObject = getMappedValues(sortedValues);
  console.log(values, sortedValues, valuesObject);

  
  return (
    <div className={styles.wrapper}>
      <div className={styles.side}>
        <span className={styles.sideLabelDefault}>Количество раз для каждого исхода</span>
        <span className={styles.sideLabelValues}>Доля выпадения ≈</span>
      </div>
      <div className={styles.graphWrapper}>
        <div className={styles.graphValues}>
          <div className={styles.graphValue} >0,5009</div>
          <div className={styles.graphValue} >0,5009</div>
        </div>
        <div className={styles.graph}>
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect x={padding1} y={height - rectHeight} />
            <Rect x={padding1} y={height - rectHeight * 2 - 1} />
          </svg>
        </div>
        <div className={styles.graphLabel}>
          <div className={styles.label}>
            <Coin1 className={styles.icon} />
            <div className={styles.value} >0,4991</div>
          </div>
          <div className={styles.label}>
            <Coin2 className={styles.icon} />
            <div className={styles.value} >0,5009</div>
          </div>
        </div>
      </div>
    </div>
  );
}

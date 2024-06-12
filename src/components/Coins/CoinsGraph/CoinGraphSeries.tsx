import React from 'react'
import { Coin, useCoinSeriesValue } from '../../../state/useCoinValue';

import Coin1 from '../../icons/coin_1.svg?react';
import Coin2 from '../../icons/coin_2.svg?react';
import Axis from '../../icons/axisCoinSeries2.svg?react';

import styles from './CoinsGraphSeries.module.scss';

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

const height = 236;
const width = 96;
const padding1 = 5;
const rectHeight = 10;
const rectWidth = 30;
const maxH = 20;

const Rect = ({x, y}: {x: number, y: number}) => {
  return (
    <rect x={x} y={y} width={rectWidth} height={rectHeight} fill="#09CA9B"/>
  );
}

const RectMaxType = ({x}: {x: number}) => {
  return (
    <rect x={x} y={0} width={rectWidth} height={height} fill="#09CA9B"/>
  );
}

const RectValueType = ({x, value}: {x: number, value: number}) => {
  return (
    <rect x={x} y={height - value} width={rectWidth} height={value} fill="#09CA9B"/>
  );
}

const GraphType1 = ({valuesObject}: {valuesObject: Record<Coin, number> }) => {
  return (
    <>
        <div
          className={`${styles.graphValue} ${styles.graphValuePosition}`}
          style={{top: `${height - rectHeight * (valuesObject.OREL) - valuesObject.OREL - 13}px`}}
        >
          {valuesObject.OREL || ''}
        </div>
        <div
          className={`${styles.graphValue} ${styles.graphValuePosition}`}
          style={{
            top: `${height - rectHeight * (valuesObject[5]) - valuesObject[5] - 13}px`,
            left: '56px',
          }}
        >
          {valuesObject[5] || ''}
        </div>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {new Array(valuesObject.OREL).fill(null).map((_, i) => 
            (<Rect key={i} x={padding1} y={height - rectHeight * (i + 1) - i} />))
          }
          {new Array(valuesObject[5]).fill(null).map((_, i) => 
            (<Rect key={i} x={padding1 + rectWidth + 26} y={height - rectHeight * (i + 1) - i} />))
          }
        </svg>
    </>
  );
}

const GraphType2 = ({valuesObject}: {valuesObject: Record<Coin, number> }) => {
  const isLeftMax = valuesObject.OREL > valuesObject[5];

  let d: number = 0; 
  if (isLeftMax) {
    d = height / valuesObject.OREL;
  } else {
    d = height / valuesObject[5];
  }  

  return (
    <>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {isLeftMax && (
            <>
              <RectMaxType
                x={padding1}
              />
              <RectValueType
                x={padding1 + rectWidth + 26}
                value={d * valuesObject[5]}
              />
            </>
          )}
          {!isLeftMax && (
            <>
              <RectMaxType
                x={padding1 + rectWidth + 26}
              />
              <RectValueType
                x={padding1}
                value={d * valuesObject.OREL}
              />
            </>
          )}
        </svg>
    </>
  );
}

const getValue = (v: number) => {
  let counterValue = v.toString();
  if (v === 0) {
    return '';
  }
  if (v > 10000) {
    counterValue = `${(v / 1000).toFixed(1).replace('.', ',')}К`;
  }
  return counterValue;
}

export const CoinsGraphSeries = () => {
  const values = useCoinSeriesValue(s => s.values);
  const length = values.length;
  const sortedValues = sortValues(values);
  const valuesObject = getMappedValues(sortedValues);

  const graphType = (valuesObject.OREL > maxH || valuesObject[5] > maxH);
  
  return (
    <div className={styles.wrapper}>
      <Axis className={styles.axis} />
      <span className={styles.sideLabelAbsolute}>Количество раз</span>
      {/* <div className={styles.side}>
        <span className={styles.sideLabelDefault}>Кол-во раз</span>
        <span className={styles.sideLabelValues}>Доля </span>
      </div> */}
      <div className={styles.graphWrapper}>
        <div className={styles.graphValues}>
          {graphType && (
            <>
              <div className={styles.graphValueRect} >{getValue(valuesObject.OREL)}</div>
              <div className={styles.graphValueRect} >{getValue(valuesObject[5])}</div>
            </>
          )}
        </div>
        <div className={styles.graph}>
          {!graphType && (<GraphType1 valuesObject={valuesObject} />)}
          {graphType && (<GraphType2 valuesObject={valuesObject} />)}
        </div>
        <div className={styles.graphLabel}>
          <span className={styles.sideLabelValuesAbsolute}>Доля </span>
          <div className={styles.label}>
            <Coin1 className={styles.icon} />
            <div className={styles.value} >{valuesObject['OREL'] > 0 ? (valuesObject['OREL'] / length).toFixed(3).replace('.', ','): '0,000'}</div>
          </div>
          <div className={styles.label}>
            <Coin2 className={styles.icon} />
            <div className={styles.value} >{valuesObject['5'] > 0 ? (valuesObject['5'] / length).toFixed(3).replace('.', ','): '0,000'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

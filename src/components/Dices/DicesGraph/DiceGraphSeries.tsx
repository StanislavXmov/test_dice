import { Fragment } from 'react'
import { Dice, useDiceValue } from '../../../state/useDiceValue';

import Dice1 from '../../icons/dice_1.svg?react';
import Dice2 from '../../icons/dice_2.svg?react';
import Dice3 from '../../icons/dice_3.svg?react';
import Dice4 from '../../icons/dice_4.svg?react';
import Dice5 from '../../icons/dice_5.svg?react';
import Dice6 from '../../icons/dice_6.svg?react';
import Axis from '../../icons/axisCoinSeries.svg?react';

import styles from './DiceGraphSeries.module.scss';

type DiceNumber = 6|5|4|3|2|1;

const sortValues = (values: Dice[]) => {
  const valuesNumbers: DiceNumber[] = values.map(v => Number(v) as DiceNumber);
  const sort = (a: number, b: number) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    }
    return 0;
  }

  return valuesNumbers.sort(sort);
} 

type DiceString = '6'|'5'|'4'|'3'|'2'|'1';
type DiceValues = Record<DiceString, number>;

const getMappedValues = (values: DiceNumber[]) => {
  const o: DiceValues = {
    '6': 0,
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
    '1': 0,
  }

  values.forEach(v => {
    o[v] += 1;
  });

  return o;
}

const findMaxCounter = (valuesObject: DiceValues) => {
  const values = Object.entries(valuesObject);
  const sort = (a: [string, number], b: [string, number]) => {
    if (a[1] < b[1]) {
      return 1;
    } else if (a[1] > b[1]) {
      return -1;
    }
    return 0;
  }
  values.sort(sort);
  return values[0][0] as DiceString;
}

const height = 226;
const width = 220;
const padding1 = 0;
const rectHeight = 10;
const rectWidth = 30;
const maxH = 20;
const gap = 8;

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

const GraphType1 = ({valuesObject}: {valuesObject: DiceValues }) => {
  const keys = Object.keys(valuesObject) as DiceString[];
  
  return (
    <>
        {keys.map((k, i) => (
          <div
            key={i}
            className={`${styles.graphValue} ${styles.graphValuePosition}`}
            style={{
              top: `${height - rectHeight * (valuesObject[k]) - valuesObject[k] - 13}px`,
              left: `${(rectWidth + gap) * i}px`,
            }}
          >
            {valuesObject[k] || ''}
          </div>
        ))}
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {keys.map((k, j) => (
            <Fragment key={j}>
            {new Array(valuesObject[k]).fill(null).map((_, i) => 
              (<Rect key={i} x={padding1 + (rectWidth + gap) * j} y={height - rectHeight * (i + 1) - i} />))
            }
            </Fragment>
          ))}
        </svg>
    </>
  );
}

const GraphType2 = ({valuesObject, maxDiceVarian}: {valuesObject: DiceValues, maxDiceVarian: DiceString }) => {
  const keys = Object.keys(valuesObject) as DiceString[];
  const idx = keys.indexOf(maxDiceVarian);
  let d: number = height / valuesObject[maxDiceVarian];

  keys.splice(idx, 1);
  
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none" xmlns="http://www.w3.org/2000/svg"
      >
          <RectMaxType
            x={padding1 + (rectWidth + gap) * idx}
          />
          {keys.map((k, i) => (
            <RectValueType
              key={i}
              x={padding1 + (rectWidth + gap) * (Number(k) - 1)}
              value={d * valuesObject[k]}
            />
          ))}
      </svg>
    </>
  );
}

export const DicesGraphSeries = () => {
  const values = useDiceValue(s => s.values);
  const length = values.length;
  const sortedValues = sortValues(values);
  const valuesObject = getMappedValues(sortedValues);
  const maxDiceVarian = findMaxCounter(valuesObject);

  const graphType = valuesObject[maxDiceVarian] > maxH;
  
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
              <div className={styles.graphValue} >{valuesObject[1]}</div>
              <div className={styles.graphValue} >{valuesObject[2]}</div>
              <div className={styles.graphValue} >{valuesObject[3]}</div>
              <div className={styles.graphValue} >{valuesObject[4]}</div>
              <div className={styles.graphValue} >{valuesObject[5]}</div>
              <div className={styles.graphValue} >{valuesObject[6]}</div>
            </>
          )}
        </div>
        <div className={styles.graph}>
          {!graphType && (<GraphType1 valuesObject={valuesObject} />)}
          {graphType && (<GraphType2 valuesObject={valuesObject} maxDiceVarian={maxDiceVarian} />)}
        </div>
        <div className={styles.graphLabel}>
          {/* <span className={styles.sideLabelValuesAbsolute}>Доля</span> */}
          <div className={styles.label}>
            <Dice1 className={styles.icon} />
            <div className={styles.value} >{valuesObject[1] > 0 ? (valuesObject[1] / length).toFixed(3).replace('.', ','): '0,000'}</div>
          </div>
          <div className={styles.label}>
            <Dice2 className={styles.icon} />
            <div className={styles.value} >{valuesObject[2] > 0 ? (valuesObject[2] / length).toFixed(3).replace('.', ','): '0,000'}</div>
          </div>
          <div className={styles.label}>
            <Dice3 className={styles.icon} />
            <div className={styles.value} >{valuesObject[3] > 0 ? (valuesObject[3] / length).toFixed(3).replace('.', ','): '0,000'}</div>
          </div>
          <div className={styles.label}>
            <Dice4 className={styles.icon} />
            <div className={styles.value} >{valuesObject[4] > 0 ? (valuesObject[4] / length).toFixed(3).replace('.', ','): '0,000'}</div>
          </div>
          <div className={styles.label}>
            <Dice5 className={styles.icon} />
            <div className={styles.value} >{valuesObject[5] > 0 ? (valuesObject[5] / length).toFixed(3).replace('.', ','): '0,000'}</div>
          </div>
          <div className={styles.label}>
            <Dice6 className={styles.icon} />
            <div className={styles.value} >{valuesObject[6] > 0 ? (valuesObject[6] / length).toFixed(3).replace('.', ','): '0,000'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react'
import { Dice, useDiceValue } from '../../../state/useDiceValue';

import styles from './DicesGraph.module.scss';

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

export const DicesGraph = () => {
  const values = useDiceValue(s => s.values);
  const sortedValues = sortValues(values);
  const valuesObject = getMappedValues(sortedValues);
  const maxDiceVarian = findMaxCounter(valuesObject);
  
  return (
    <div className={styles.wrapper}>
      DicesGraph
    </div>
  );
}

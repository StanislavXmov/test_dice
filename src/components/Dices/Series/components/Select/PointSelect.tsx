import { ChangeEvent } from 'react';
import { useDiceSeries } from '../../../../../state/useDiceSeries';

import styles from './Select.module.scss';

const titles: {
  '=': Record<string, string>;
  '>': Record<string, string>;
  '<': Record<string, string>;
  '>=': Record<string, string>;
  '<=': Record<string, string>;
} = {
  '=':{
    '1': 'одно очко',
    '2': 'два очка',
    '3': 'три очка',
    '4': 'четыре очка',
    '5': 'пять очков',
    '6': 'шесть очков',
    '7': 'семь очков',
    '8': 'восемь очков',
    '9': 'девять очков',
    '10': 'десять очков',
    '11': 'одиннадцать очков',
    '12': 'двенадцать очков',
  },
  ">": {
    '1': 'одного очко',
    '2': 'двух очка',
    '3': 'трех очка',
    '4': 'четырех очка',
    '5': 'пяти очков',
    '6': 'шести очков',
    '7': 'семи очков',
    '8': 'восеми очков',
    '9': 'девяти очков',
    '10': 'десяти очков',
    '11': 'одиннадцати очков',
    '12': 'двенадцати очков',
  },
  "<": {
    '1': 'одного очко',
    '2': 'двух очка',
    '3': 'трех очка',
    '4': 'четырех очка',
    '5': 'пяти очков',
    '6': 'шести очков',
    '7': 'семи очков',
    '8': 'восеми очков',
    '9': 'девяти очков',
    '10': 'десяти очков',
    '11': 'одиннадцати очков',
    '12': 'двенадцати очков',
  },
  ">=": {
    '1': 'одному очку',
    '2': 'двум очкам',
    '3': 'трем очкам',
    '4': 'четырем очкам',
    '5': 'пяти очкам',
    '6': 'шести очкам',
    '7': 'семи очкам',
    '8': 'восеми очкам',
    '9': 'девяти очкам',
    '10': 'десяти очкам',
    '11': 'одиннадцати очкам',
    '12': 'двенадцати очкам',
  },
  "<=": {
    '1': 'одному очку',
    '2': 'двум очкам',
    '3': 'трем очкам',
    '4': 'четырем очкам',
    '5': 'пяти очкам',
    '6': 'шести очкам',
    '7': 'семи очкам',
    '8': 'восеми очкам',
    '9': 'девяти очкам',
    '10': 'десяти очкам',
    '11': 'одиннадцати очкам',
    '12': 'двенадцати очкам',
  }
}

export const PointSelect = () => {
  const edge = useDiceSeries(s => s.edge);
  const event = useDiceSeries(s => s.event);
  const setPoint = useDiceSeries(s => s.setPoint);

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPoint(Number(e.target.value));
  }
  return (
    <label className={styles.label} htmlFor="PointSelect">
      <select
        id='PointSelect'
        className={styles.selectPoint}
        onChange={selectHandler}
        defaultValue={1}
      >
        {new Array(edge).fill(null).map((_, i) => (
          <option key={i} value={i + 1}>{titles[event][i + 1]}</option>
        ))}
      </select>
    </label>
  );
}

import { Key, useState } from 'react';
import random from 'random';
import { Edge, EventDice, useDiceSeries } from '../../../state/useDiceSeries';
import { LengthRange } from './components/Range/LengthRange';
import { SerialsRange } from './components/Range/SerialsRange';
import { Button } from '../../Button/Button';
import { EventSelect } from './components/Select/EventSelect';
import { KSelect } from './components/Select/KSelect';
import { EdgeSelect } from './components/Select/EdgeSelect';
import { PointSelect } from './components/Select/PointSelect';
import { ResetButton } from '../../ResetButton/ResetButton';
import { KRange } from './components/Range/KRange';
import { KaTeX } from '../../Katex/Katex';

import Dice1 from '../../icons/dice_1.svg?react';
import Dice2 from '../../icons/dice_2.svg?react';
import Dice3 from '../../icons/dice_3.svg?react';
import Dice4 from '../../icons/dice_4.svg?react';
import Dice5 from '../../icons/dice_5.svg?react';
import Dice6 from '../../icons/dice_6.svg?react';

import Dice2_1 from '../../icons/dice8_1.svg?react';
import Dice2_2 from '../../icons/dice8_2.svg?react';
import Dice2_3 from '../../icons/dice8_3.svg?react';
import Dice2_4 from '../../icons/dice8_4.svg?react';
import Dice2_5 from '../../icons/dice8_5.svg?react';
import Dice2_6 from '../../icons/dice8_6.svg?react';
import Dice2_7 from '../../icons/dice8_7.svg?react';
import Dice2_8 from '../../icons/dice8_8.svg?react';

import Dice3_1 from '../../icons/dice12_1.svg?react';
import Dice3_2 from '../../icons/dice12_2.svg?react';
import Dice3_3 from '../../icons/dice12_3.svg?react';
import Dice3_4 from '../../icons/dice12_4.svg?react';
import Dice3_5 from '../../icons/dice12_5.svg?react';
import Dice3_6 from '../../icons/dice12_6.svg?react';
import Dice3_7 from '../../icons/dice12_7.svg?react';
import Dice3_8 from '../../icons/dice12_8.svg?react';
import Dice3_9 from '../../icons/dice12_9.svg?react';
import Dice3_10 from '../../icons/dice12_10.svg?react';
import Dice3_11 from '../../icons/dice12_11.svg?react';
import Dice3_12 from '../../icons/dice12_12.svg?react';

import styles from './Series.module.scss';

const dices6 = {
  1: (key: Key) => <Dice1 className={styles.coinIcon} key={key} />,
  2: (key: Key) => <Dice2 className={styles.coinIcon} key={key} />,
  3: (key: Key) => <Dice3 className={styles.coinIcon} key={key} />,
  4: (key: Key) => <Dice4 className={styles.coinIcon} key={key} />,
  5: (key: Key) => <Dice5 className={styles.coinIcon} key={key} />,
  6: (key: Key) => <Dice6 className={styles.coinIcon} key={key} />,
}

type Dices6Key = keyof(typeof dices6);

const dices8 = {
  1: (key: Key) => <Dice2_1 className={styles.coinIcon} key={key} />,
  2: (key: Key) => <Dice2_2 className={styles.coinIcon} key={key} />,
  3: (key: Key) => <Dice2_3 className={styles.coinIcon} key={key} />,
  4: (key: Key) => <Dice2_4 className={styles.coinIcon} key={key} />,
  5: (key: Key) => <Dice2_5 className={styles.coinIcon} key={key} />,
  6: (key: Key) => <Dice2_6 className={styles.coinIcon} key={key} />,
  7: (key: Key) => <Dice2_7 className={styles.coinIcon} key={key} />,
  8: (key: Key) => <Dice2_8 className={styles.coinIcon} key={key} />,
}

type Dices8Key = keyof(typeof dices8);

const dices12 = {
  1: (key: Key) => <Dice3_1 className={styles.coinIcon} key={key} />,
  2: (key: Key) => <Dice3_2 className={styles.coinIcon} key={key} />,
  3: (key: Key) => <Dice3_3 className={styles.coinIcon} key={key} />,
  4: (key: Key) => <Dice3_4 className={styles.coinIcon} key={key} />,
  5: (key: Key) => <Dice3_5 className={styles.coinIcon} key={key} />,
  6: (key: Key) => <Dice3_6 className={styles.coinIcon} key={key} />,
  7: (key: Key) => <Dice3_7 className={styles.coinIcon} key={key} />,
  8: (key: Key) => <Dice3_8 className={styles.coinIcon} key={key} />,
  9: (key: Key) => <Dice3_9 className={styles.coinIcon} key={key} />,
  10: (key: Key) => <Dice3_10 className={styles.coinIcon} key={key} />,
  11: (key: Key) => <Dice3_11 className={styles.coinIcon} key={key} />,
  12: (key: Key) => <Dice3_12 className={styles.coinIcon} key={key} />,
}

type Dices12Key = keyof(typeof dices12)

const factorial = (n: number): number => {
  if (n < 0) {
    return -1;
  } else if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

const calc = (k: number, n: number, edge: Edge) => {
  let n1 = 1;
  let n2 = 1;
  if (edge === 6) {
    n1 = 0.167;
    n2 = 0.833;
  } else if (edge === 8) {
    n1 = 0.125;
    n2 = 0.875;
  } else if (edge === 12) {
    n1 = 0.083;
    n2 = 0.916;
  }
  const c = factorial(n) / (factorial(k) * factorial(n - k));
  return c * Math.pow(n1, k) * Math.pow(n2, n - k);
}

const match = (event: EventDice, k: number, point: number, list: number[]) => {
  if (event === '=') {
    let count = 0;
    list.forEach(c => {
      if (c === point) {
        count++;
      }
    });

    if (count === k) {
      return true;
    } else {
      return false;
    }
  } else if (event === '>') {
    let count = 0;
    list.forEach(c => {
      if (c > point) {
        count++;
      }
    });

    if (count === k) {
      return true;
    } else {
      return false;
    }
  } else if (event === '<') {
    let count = 0;
    list.forEach(c => {
      if (c < point) {
        count++;
      }
    });

    if (count === k) {
      return true;
    } else {
      return false;
    }
  }
}

const getTextExpression = (k: number, n: number, edge: Edge) => {  
  const x = calc(k, n, edge).toFixed(2).replace('.', '{{\\char\`,}}');
  let n1: string = '';
  let n2: string = '';
  if (edge === 6) {
    n1 = `{0{{\\char\`,}}167`
    n2 = `{0{{\\char\`,}}833`
  } else if (edge === 8) {
    n1 = `{0{{\\char\`,}}125`
    n2 = `{0{{\\char\`,}}875`
  } else if (edge === 12) {
    n1 = `{0{{\\char\`,}}083`
    n2 = `{0{{\\char\`,}}916`
  }
  return `P{k \\atop n} = P{${k} \\atop ${n}} = C {${k} \\atop ${n}}${n1}^${k}}\\space${n2}^${n - k}} \\approx ${x}`;
}

const getTextExpressionExp = (v: number, k: number) => {
  if (v === 0) {
    return `P{\\atop \\text{эксп}} = 0`;
  }
  return `P{\\atop \\text{эксп}} = {\\frac{${v}}{${k}}} = ${(v / k).toFixed(2).replace('.', '{{\\char\`,}}')}`;
}


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
        if (edge === 6) {
          const n = random.int(1, 6);
          list.push(n);
        } else if (edge === 8) {
          const n = random.int(1, 8);
          list.push(n);
        } else if (edge === 12) {
          const n = random.int(1, 12);
          list.push(n);
        }
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
      if (match(event, k, point, s)) {
        counter++;
      }
    });
    return counter;
  }

  const resetHandler = () => {
    // calcSeries();
  }

  return (
    <div className={styles.wrapper}>
      <ResetButton cb={resetHandler} />
      <h2 className={styles.title}>Серии бросков кубика и формула Бернулли</h2>
      <div className={styles.controllWrapper}>
        <div className={styles.eventWrapper}>
          <div className={styles.eventTitle}>Событие:</div>
          {edge === 6 && (<img src="" alt="dice6" className={styles.eventImage} />)}
          {edge === 8 && (<img src="" alt="dice8" className={styles.eventImage} />)}
          {edge === 12 && (<img src="" alt="dice12" className={styles.eventImage} />)}
        </div>
        <div className={styles.series}>
          <div className={styles.seriesControll}>
            <EdgeSelect />
            <span className={styles.text}>в серии из</span>
            <LengthRange max={20} min={5} />
          </div>
          <div className={styles.seriesControll}>
            <EventSelect />
            <PointSelect />
            <span className={styles.text}>выпало</span>
            <KRange />
          </div>
        </div>
      </div>
      <div className={styles.calcWrapper}>
        <div className={styles.calcTitle}>Теория</div>
        <div className={styles.formulaWrapper}>
          <div className={styles.formulaTitle}>
            Вероятность <span className={styles.active}>события</span> по формуле Бернулли:
          </div>
          <KaTeX
            texExpression={getTextExpression(k, length, edge)}
            className={''}
          />
        </div>
        <div className={styles.calcData}>
          <KaTeX
            texExpression={calc(k, length, edge).toFixed(3).replace('.', '{{\\char\`,}}')}
            className={''}
          />
        </div>
      </div>
      <div className={styles.calcWrapper}>
        <div className={styles.calcTitle}>
          <div>Эксперимент</div>
          <SerialsRange max={500} min={2} />
        </div>
        <div className={styles.formulaWrapper}>
          <div className={styles.formulaTitle}>
            Частота <span className={styles.active}>события</span> в эксперименте:
          </div>
          <KaTeX
            texExpression={getTextExpressionExp(findedMatch(), seriesN)}
            className={''}
          />
        </div>
        <div className={styles.calcData}>
          <KaTeX
            texExpression={(findedMatch() / seriesN).toFixed(3).replace('.', '{{\\char\`,}}')}
            className={''}
          />
        </div>
      </div>

      {/* <div className={styles.controllWrapper}>
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
          <div key={i} className={`${styles.list} ${match(event, k, point, s) ? styles.activeList : ''}`}>
            <div className={styles.itemsWrapper}>
              {s.map((c, i) => (
                <div key={i}>
                  {edge === 6 && (
                    dices6[c as Dices6Key](i)
                  )}
                  {edge === 8 && (
                    dices8[c as Dices8Key](i)
                  )}
                  {edge === 12 && (
                    dices12[c as Dices12Key](i)
                  )}
                </div>
              ))}
            </div>
            {match(event, k, point, s) && <span className={styles.listInfo}>успешная серия</span>}
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
            {edge === 6 && <span className={styles.value}>0.167</span>}
            {edge === 8 && <span className={styles.value}>0.125</span>}
            {edge === 12 && <span className={styles.value}>0.083</span>}
            <span className={styles.dWithoutValue} style={{width: k >= 10 ? '16px' : '12px'}}>
              <span className={styles.supWithoutValue}>{k}</span>
            </span>
            {edge === 6 && <span className={styles.value}>0.833</span>}
            {edge === 8 && <span className={styles.value}>0.875</span>}
            {edge === 12 && <span className={styles.value}>0.916</span>}
            <span className={styles.dWithoutValue} style={{width: k >= 10 ? '16px' : '12px'}}>
              <span className={styles.supWithoutValue}>{`${length} - ${k}`}</span>
            </span>
            <span style={{width: (k >= 10 || length >= 10) ? '28px' : '22px', textAlign: 'right', marginRight: '4px'}}>≈</span>
            <span className={styles.value}>{calc(k, length, edge).toFixed(2)}</span>
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
      </div> */}
    </div>
  )
}

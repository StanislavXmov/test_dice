import { useEffect, useState } from 'react';
import random from 'random';
import { LengthRange } from './components/Range/LengthRange';
import { SerialsRange } from './components/Range/SerialsRange';
import { Coin, useCoinSeries } from '../../../state/useCoinSeries';
import { Button } from '../../Button/Button';
import { EventSelect } from './components/Select/EventSelect';
import { KSelect } from './components/Select/KSelect';
import { KRange } from './components/Range/KRange';
import { KaTeX } from '../../Katex/Katex';
import { ResetButton } from '../../ResetButton/ResetButton';
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

const calc = (k: number, n: number) => {
  const c = factorial(n) / (factorial(k) * factorial(n - k));
  return c * Math.pow(0.5, k) * Math.pow(0.5, n - k);
}

const match = (event: Coin, k: number, list: Coin[]) => {
  let count = 0;
  list.forEach(c => {
    if (c === event) {
      count++;
    }
  });

  if (count === k) {
    return true;
  } else {
    return false;
  }
}

const getTextExpression = (k: number, n: number) => {  
  const x = calc(k, n).toFixed(2).replace('.', '{{\\char\`,}}');
  return `P{k \\atop n} = P{${k} \\atop ${n}} = C {${k} \\atop ${n}}{0{{\\char\`,}}5^${k}}\\space{0{{\\char\`,}}5^${n - k}} \\approx ${x}`;
}

const getTextExpressionExp = (v: number, k: number) => {
  if (v === 0) {
    return `P{\\atop \\text{эксп}} = 0`;
  }
  return `P{\\atop \\text{эксп}} = {\\frac{${v}}{${k}}} = ${(v / k).toFixed(2).replace('.', '{{\\char\`,}}')}`;
}

export const CoinSeries = () => {
  const [disabled, setDisabled] = useState(false);
  const length = useCoinSeries(s => s.length);
  const seriesN = useCoinSeries(s => s.seriesN);
  const event = useCoinSeries(s => s.event);
  const k = useCoinSeries(s => s.k);
  const series = useCoinSeries(s => s.series);
  const calcSeries = useCoinSeries(s => s.calcSeries);

  const findedMatch = (seriesN: number, length: number) => {
    const s = [...series].splice(0, seriesN).map(_s => [..._s].splice(0, length));
    let counter = 0;
    s.forEach(s => {
      if (match(event, k, s)) {
        counter++;
      }
    });
    return counter;
  }

  const resetHandler = () => {
    calcSeries();
  }

  useEffect(() => {
    calcSeries();
  }, []);

  return (
    <div className={styles.wrapper}>
      <ResetButton cb={resetHandler} />
      <h2 className={styles.title}>Серии бросков монеты и формула Бернулли</h2>
      <div className={styles.controllWrapper}>
        <div className={styles.eventTitle}>Событие:</div>
        <div className={styles.series}>
          <span className={styles.text}>в серии из</span>
          <LengthRange max={20} min={5} />
          <EventSelect />
          <KRange />
        </div>
      </div>
      <div className={styles.calcWrapper}>
        <div className={styles.calcTitle}>Теория</div>
        <div className={styles.formulaWrapper}>
          <div className={styles.formulaTitle}>
            Вероятность <span className={styles.active}>события</span> по формуле Бернулли:
          </div>
          <KaTeX
            texExpression={getTextExpression(k, length)}
            className={''}
          />
        </div>
        <div className={styles.calcData}>
          <KaTeX
            texExpression={calc(k, length).toFixed(3).replace('.', '{{\\char\`,}}')}
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
            texExpression={getTextExpressionExp(findedMatch(seriesN, length), seriesN)}
            className={''}
          />
        </div>
        <div className={styles.calcData}>
          <KaTeX
            texExpression={(findedMatch(seriesN, length) / seriesN).toFixed(3).replace('.', '{{\\char\`,}}')}
            className={''}
          />
        </div>
      </div>
      <div className={styles.listWrapper}>
        {[...series].splice(0, seriesN).map((s, i) => {
          const _s = [...s].splice(0, length);
          const isMatch = match(event, k, _s);
          return (
          <div key={i} className={`${styles.list} ${isMatch ? styles.activeList : ''}`}>
            <div className={styles.itemsWrapper}>
              {_s.map((c, i) => (
                <div key={i}>
                  {c === 'OREL' ? <Coin1 className={styles.coinIcon} /> : <Coin2 className={styles.coinIcon} />}
                </div>
              ))}
            </div>
            {isMatch && <span className={styles.listInfo}>✓{_s.length > 16 ? '' :` событие`}</span>}
          </div>
        )})}
      </div>
    </div>
  )
}

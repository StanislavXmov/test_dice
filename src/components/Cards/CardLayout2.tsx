import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import random from 'random';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

import styles from './CardLayout2.module.scss';

import ResetIcon from '../icons/reset2.svg?react';
import CardBG from '../images/cards/cards.png';
import Card1 from '../images/cards/card1.png';
import Card2 from '../images/cards/card2.png';
import Card3 from '../images/cards/card3.png';
import Card4 from '../images/cards/card4.png';
import Card5 from '../images/cards/card5.png';


const cards = {
  1: Card1,
  2: Card2,
  3: Card3,
  4: Card4,
  5: Card5,
}

type CardsKey = keyof(typeof cards);

const task = {
  taskTitle: 'Сколькими способами можно выбрать карту из 4 колод для каждого пустого места в тройке карт? Перекладывайте карты и впишите ответ, когда поймёте закономерность.'
}

interface ButtonProps {
  cb: () => void;
}

export const ResetButton = ({ cb }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={cb}
    >
      <ResetIcon className={styles.icon} />
    </button>
  );
}

const TableDesc = ({ taskTitle }: { taskTitle: string }) => {
  return (
    <div className={styles.desc}>
      {taskTitle}
    </div>
  );
}

const CartDrop = ({className, card}: {className: string, card: CardsKey}) => {
  return (
    <div
      className={`${className} ${styles.cardDropDone}`}
    >
      <div className={styles.dropCardsWrapper}>
        <img src={cards[card]} className={styles.cardItemDrop} draggable={false} />
      </div>
    </div>
  );
}

const Cards = ({cards}: {cards: number[]}) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card1} className={styles.cardItemDefault} draggable={false} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card2} className={styles.cardItemDefault} draggable={false} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card3} className={styles.cardItemDefault} draggable={false} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card4} className={styles.cardItemDefault} draggable={false} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card5} className={styles.cardItemDefault} draggable={false} />
      </div>
      <CartDrop className={styles.cardDrop1} card={cards[0] as CardsKey} />
      <CartDrop className={styles.cardDrop2} card={cards[1] as CardsKey} />
      <CartDrop className={styles.cardDrop3} card={cards[2] as CardsKey} />
    </div>
  );
}

const InputControlls = ({error, answer, value, setValueHandler, setInfoHandler}: {
  error: boolean,
  answer: boolean,
  value: number,
  setValueHandler: (v: number) => void,
  setInfoHandler: (v: boolean, type: 'ERROR' | 'ANSWER') => void
}) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setInfoHandler(false, 'ANSWER');
      setInfoHandler(false, 'ERROR');
      setValueHandler(value);
    }
  }
  
  return (
    <div className={styles.inputControllsWrapper}>
      <div className={styles.controllsLabel}>Количество способов:</div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="drop1"
          id="drop1"
          className={`
            ${styles.formulaInput}`}
          onChange={(e) => {}}
          // disabled
          value={5}
        />
        {(error || answer) &&(<span className={styles.symbol}>×</span>)}
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="drop2"
          id="drop2"
          className={`
            ${styles.formulaInput}`}
          onChange={(e) => {}}
          // disabled
          value={5}
        />
        {(error || answer) &&(<span className={styles.symbol}>×</span>)}
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="drop3"
          id="drop3"
          className={`
            ${styles.formulaInput}`}
          onChange={(e) => {}}
          // disabled
          value={5}
        />
        {(error || answer) &&(<span className={styles.symbol}>=</span>)}
      </div>
      <div className={styles.inputCalcWrapper}>
        <input
          type="text"
          name="drop3"
          id="drop3"
          className={`
            ${styles.formulaInput}  ${error ? styles.errorColor : ''}  ${answer ? styles.answerColor : ''}`}
          onChange={onChangeHandler}
          // disabled
          value={value || ''}
        />
        <div className={styles.inputCalcLabel}>Количество размещений с повторениями из 5 по 5:</div>
        <div className={styles.inputCalcInfo}>
          {error && (
            <div className={styles.calcWrapper}>
              <span className={styles.errorMessage}>× Ошибка</span>
            </div>
          )}
          {answer && (
            <div className={styles.calcWrapper}>
              <span className={styles.answerMessage}>✓ Верно</span>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

const getRandomArray = () => {
  const a: number[] = [];
  for (let i = 0; i < 3; i++) {
    const n = random.int(1, 5)
    a.push(n);
  }
  return a;
}

export const CardLayout2 = () => {
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [value, setValue] = useState(0);
  const [cards, setCards] = useState<number[]>(getRandomArray());
  
  const setValueHandler = (v: number) => {
    setValue(v);
  }

  const resetHandler = () => {
    setAnswer(false);
    setError(false);
    setValue(0);
    setCards(getRandomArray());
  }

  const checkHandler = () => {
    if (value && value === 125) {
      setAnswer(true);
      setError(false);
    } else {
      if (value) {
        setError(true);
      }
    }
  }

  const setInfoHandler = (v: boolean, type: 'ERROR' | 'ANSWER') => {
    if (type === 'ERROR') {
      setError(v);
    } else if (type ='ANSWER') {
      setAnswer(v);
    }
  }

  return (
    <div className={styles.layer}>
      <ResetButton cb={resetHandler} />
      <h2 className={styles.title}>Количество размещений с повторениями</h2>
      <TableDesc taskTitle={task.taskTitle} />
      <Cards cards={cards} />
      <InputControlls
        answer={answer}
        error={error}
        value={value}
        setValueHandler={setValueHandler}
        setInfoHandler={setInfoHandler}
      />
      <div className={styles.submitWrapper}>
        <button
          className={styles.submitButton}
          onClick={checkHandler}
        >
          Проверить
        </button>
      </div>
    </div>
  );
}

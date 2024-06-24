import React from 'react';

import styles from './CardLayout1.module.scss';

import ResetIcon from '../icons/reset2.svg?react';
import CardBG from '../images/cards/cards.png';
import Card1 from '../images/cards/card1.png';

const task = {
  taskTitle: 'Сколькими способами можно выбрать карту из 5 колод для каждого пустого места в тройке карт? Перекладывайте карты и впишите ответ, когда поймёте закономерность.'
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

const Cards = () => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card1} className={styles.cardItem} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
      </div>
      <div className={`${styles.cardDrop1} ${styles.cardDropActive}`}></div>
      <div className={`${styles.cardDrop2}`}></div>
      <div className={`${styles.cardDrop3}`}></div>
    </div>
  );
}

export const CardLayout1 = () => {

  const resetHandler = () => {
    console.log('RESET');
  }

  return (
    <div className={styles.layer}>
      <ResetButton cb={resetHandler} />
      <h2 className={styles.title}>Размещения с повторениями</h2>
      <TableDesc taskTitle={task.taskTitle} />
      <Cards />
    </div>
  );
}

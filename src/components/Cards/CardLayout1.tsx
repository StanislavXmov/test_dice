import { DragEvent, useEffect, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { CardsType, useCardsLyaout1 } from '../../state/useCards';

import styles from './CardLayout1.module.scss';

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

const Card = ({type}: {type: CardsType}) => {
  const setDrop1Card = useCardsLyaout1(s => s.setDrop1Card);
  const drop1Values = useCardsLyaout1(s => s.drop1Values);
  console.log(drop1Values);
  

  const target = useRef(null);
  
  const [{
    x,
    y,
    z,
    visibility,
  }, api] = useSpring<{x: number, y: number, z: number, visibility: "initial" | "visible" | "hidden"}>(
    () => ({
      x: 0,
      y: 0,
      visibility: 'visible',
      z: 13,
    })
  );

  useGesture(
    {
      onDrag: ({ movement: [x, y] }) => {
        api.start({ x, y, z: 30 });
      },
      onDragEnd: ({ xy }) => {
        const elements = document.elementsFromPoint(xy[0], xy[1]);
        const el = elements.find(e => (e as HTMLElement).dataset.receive);
        if (el) {
          const receiveType = (el as HTMLElement).dataset.receive;
          // console.log('RECEIVE_TYPE', receiveType);
          if (Number(receiveType) === 1) {
            if (drop1Values.includes(type)) {
              api.start({x: 0, y: 0, z: 13 });
              return;
            } else {
              setDrop1Card(type);
            }
          } else if (Number(receiveType) === 2) {
            
          } else if (Number(receiveType) === 3) {
            
          }

          api.start({x: 0, y: 0, visibility: 'hidden', z: 13 });
          setTimeout(() => {
            api.start({x: 0, y: 0, visibility: 'visible'});
          }, 1000);
        } else {
          api.start({x: 0, y: 0, z: 13 });
        }
      }
    }, {
      target,
      eventOptions: { passive: false },
    }
  );
  return (
    <animated.div
      ref={target}
      style={{x, y, visibility, zIndex: z}}
      className={styles.cardAnim}
    >
      <animated.div>
        <img src={cards[type as CardsKey]} className={styles.cardItem} draggable={false} />
      </animated.div>
    </animated.div>
  );
}

const CartDrop1 = ({type}: {type: number}) => {
  const drop1Card = useCardsLyaout1(s => s.drop1Card);
  const drop1PrevCard = useCardsLyaout1(s => s.drop1PrevCard);
  const drop1IsActive = useCardsLyaout1(s => s.drop1IsActive);

  const [{x ,y , visibility}, api] = useSpring<{x: number, y: number, visibility: "initial" | "visible" | "hidden"}>(
    () => ({
      x: 0,
      y: 0,
      visibility: 'hidden',
    })
  );
  const [{x2, y2, visibility2}, api2] = useSpring<{x2: number, y2: number, visibility2: "initial" | "visible" | "hidden"}>(
    () => ({
      x2: 0,
      y2: 0,
      visibility2: 'hidden',
    })
  );
  const [{x3, y3, visibility3}, api3] = useSpring<{x3: number, y3: number, visibility3: "initial" | "visible" | "hidden"}>(
    () => ({
      x3: 0,
      y3: 0,
      visibility3: 'hidden',
    })
  );
  const [{x4, y4, visibility4}, api4] = useSpring<{x4: number, y4: number, visibility4: "initial" | "visible" | "hidden"}>(
    () => ({
      x4: 0,
      y4: 0,
      visibility4: 'hidden',
    })
  );
  const [{x5, y5, visibility5}, api5] = useSpring<{x5: number, y5: number, visibility5: "initial" | "visible" | "hidden"}>(
    () => ({
      x5: 0,
      y5: 0,
      visibility5: 'hidden',
    })
  );
  
  useEffect(() => {
    if (drop1PrevCard && drop1Card !== drop1PrevCard) {
      if (drop1PrevCard === 1) {
        api.start({x: - 90 - 30, y: - 126 - 20, visibility: 'visible'});
        setTimeout(() => {
          api.start({x: 0, y: 0, visibility: 'hidden'});
        }, 1000);
      } else if (drop1PrevCard === 2) {
        api2.start({x2: 0, y2: - 126 - 20, visibility2: 'visible'});
        setTimeout(() => {
          api2.start({x2: 0, y2: 0, visibility2: 'hidden'});
        }, 1000);
      } else if (drop1PrevCard === 3) {
        api3.start({x3: 90 + 30, y3: - 126 - 20, visibility3: 'visible'});
        setTimeout(() => {
          api3.start({x3: 0, y3: 0, visibility3: 'hidden'});
        }, 1000);
      } else if (drop1PrevCard === 4) {
        api4.start({x4: 90 + 30 + 90 + 30, y4: - 126 - 20, visibility4: 'visible'});
        setTimeout(() => {
          api4.start({x4: 0, y4: 0, visibility4: 'hidden'});
        }, 1000);
      } else if (drop1PrevCard === 5) {
        api5.start({x5: 90 + 30 + 90 + 30 + 90 + 30, y5: - 126 - 20, visibility5: 'visible'});
        setTimeout(() => {
          api5.start({x5: 0, y5: 0, visibility5: 'hidden'});
        }, 1000);
      }
      
    }
  }, [drop1Card]);

  return (
    <animated.div
      data-receive={type}
      className={`${styles.cardDrop1} ${drop1IsActive ? styles.cardDropActive : ''}`}
    >
      <div className={styles.dropCardsWrapper}>
        {(drop1PrevCard && drop1PrevCard === 1) && (
          <animated.img
            src={Card1}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x, y, visibility}}
          />
        )}
        {(drop1PrevCard && drop1PrevCard === 2) && (
          <animated.img
            src={Card2}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x2, y: y2, visibility: visibility2}}
          />
        )}
        {(drop1PrevCard && drop1PrevCard === 3) && (
          <animated.img
            src={Card3}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x3, y: y3, visibility: visibility3}}
          />
        )}
        {(drop1PrevCard && drop1PrevCard === 4) && (
          <animated.img
            src={Card4}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x4, y: y4, visibility: visibility4}}
          />
        )}
        {(drop1PrevCard && drop1PrevCard === 5) && (
          <animated.img
            src={Card5}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x5, y: y5, visibility: visibility5}}
          />
        )}

        {(drop1Card && drop1Card === 1) && (
          <img src={Card1} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop1Card && drop1Card === 2) && (
          <img src={Card2} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop1Card && drop1Card === 3) && (
          <img src={Card3} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop1Card && drop1Card === 4) && (
          <img src={Card4} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop1Card && drop1Card === 5) && (
          <img src={Card5} className={styles.cardItemDrop} draggable={false} />
        )}
      </div>
    </animated.div>
  );
}

const Cards = () => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card1} className={styles.cardItemDefault} draggable={false} />
        <Card type={1} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card2} className={styles.cardItemDefault} draggable={false} />
        <Card type={2} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card3} className={styles.cardItemDefault} draggable={false} />
        <Card type={3} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card4} className={styles.cardItemDefault} draggable={false} />
        <Card type={4} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card5} className={styles.cardItemDefault} draggable={false} />
        <Card type={5} />
      </div>
      <CartDrop1 type={1} />
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

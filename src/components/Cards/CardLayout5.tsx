import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { CardsType, useCardsLyaout1 } from '../../state/useCards';

import styles from './CardLayout5.module.scss';

import ResetIcon from '../icons/reset2.svg?react';
import CardBG from '../images/cards/cards.png';
import Card1 from '../images/cards/card1.png';
import Card2 from '../images/cards/card2.png';
import Card3 from '../images/cards/card3.png';
import Card4 from '../images/cards/card4.png';
import Card5 from '../images/cards/card5.png';
import ArrowIcon from '../icons/arrow.svg?react';


const cards = {
  1: Card1,
  2: Card2,
  3: Card3,
  4: Card4,
  5: Card5,
}

type CardsKey = keyof(typeof cards);

const task = {
  taskTitle: 'Сколькими способами можно выбрать карту из 5 колод для каждого пустого места в тройке карт? Посчитайте возможности для первого места, потом для второго и для третьего.'
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

const Card = ({type, z, setZIndex}: {
  type: CardsType,
  z: number,
  setZIndex: (id: number) => void,
}) => {
  const setDrop1Card = useCardsLyaout1(s => s.setDrop1Card);
  const drop1Values = useCardsLyaout1(s => s.drop1Values);
  const setDrop2Card = useCardsLyaout1(s => s.setDrop2Card);
  const drop2Values = useCardsLyaout1(s => s.drop2Values);
  const setDrop3Card = useCardsLyaout1(s => s.setDrop3Card);
  const drop3Values = useCardsLyaout1(s => s.drop3Values);
  const drop1IsActive = useCardsLyaout1(s => s.drop1IsActive);
  const drop2IsActive = useCardsLyaout1(s => s.drop2IsActive);
  const drop3IsActive = useCardsLyaout1(s => s.drop3IsActive);
  // console.log(drop1Values, drop2Values, drop3Values);
  

  const target = useRef(null);
  
  const [{
    x,
    y,
    visibility,
  }, api] = useSpring<{x: number, y: number, z: number, visibility: "initial" | "visible" | "hidden"}>(
    () => ({
      x: 0,
      y: 0,
      visibility: 'visible',
    })
  );

  useGesture(
    {
      onDrag: ({ movement: [x, y] }) => {
        // api.start({ x, y, z: 30 });
        api.start({ x, y });
      },
      onDragStart: () => {
        setZIndex(type);
      },
      onDragEnd: ({ xy }) => {
        const elements = document.elementsFromPoint(xy[0], xy[1]);
        const el = elements.find(e => (e as HTMLElement).dataset.receive);
        if (el) {
          const receiveType = (el as HTMLElement).dataset.receive;
          // console.log('RECEIVE_TYPE', receiveType);
          if (Number(receiveType) === 1) {
            if (!drop1IsActive) {
              // api.start({x: 0, y: 0, z: 13 });
              api.start({x: 0, y: 0 });
              return;
            }
            if (drop1Values.includes(type)) {
              // api.start({x: 0, y: 0, z: 13 });
              api.start({x: 0, y: 0 });
              return;
            } else {
              setDrop1Card(type);
            }
          } else if (Number(receiveType) === 2) {
            if (!drop2IsActive) {
              // api.start({x: 0, y: 0, z: 13 });
              api.start({x: 0, y: 0 });
              return;
            }
            if (drop2Values.includes(type)) {
              // api.start({x: 0, y: 0, z: 13 });
              api.start({x: 0, y: 0 });
              return;
            } else {
              setDrop2Card(type);
            }
          } else if (Number(receiveType) === 3) {
            if (!drop3IsActive) {
              // api.start({x: 0, y: 0, z: 13 });
              api.start({x: 0, y: 0 });
              return;
            }
            if (drop3Values.includes(type)) {
              // api.start({x: 0, y: 0, z: 13 });
              api.start({x: 0, y: 0 });
              return;
            } else {
              setDrop3Card(type);
            }
          }

          // api.start({x: 0, y: 0, visibility: 'hidden', z: 13 });
          api.start({x: 0, y: 0, visibility: 'hidden'});
          setTimeout(() => {
            api.start({x: 0, y: 0, visibility: 'visible'});
          }, 1000);
        } else {
          // api.start({x: 0, y: 0, z: 13 });
          api.start({x: 0, y: 0});
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
      style={{x, y, visibility, zIndex: z + 20}}
      className={styles.cardAnim}
    >
      <animated.div>
        <img src={cards[type as CardsKey]} className={styles.cardItem} draggable={false} />
      </animated.div>
    </animated.div>
  );
}

const CartDropDefault = ({className, card}: {className: string, card: CardsKey}) => {
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

const CartDrop1 = ({type, idxs}: {type: number, idxs: number[]}) => {
  const drop1Card = useCardsLyaout1(s => s.drop1Card);
  const drop1PrevCard = useCardsLyaout1(s => s.drop1PrevCard);
  const drop1IsActive = useCardsLyaout1(s => s.drop1IsActive);
  const drop1Values = useCardsLyaout1(s => s.drop1Values);

  const [{x, y, visibility}, api] = useSpring<{x: number, y: number, visibility: "initial" | "visible" | "hidden"}>(
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
        api.start({x: - 90 - 30 + 2, y: - 126 - 20 + 2, visibility: 'visible'});
        setTimeout(() => {
          api.start({x: 0, y: 0, visibility: 'hidden'});
        }, 1000);
      } else if (drop1PrevCard === 2) {
        api2.start({x2: 0 + 2, y2: - 126 - 20 + 2, visibility2: 'visible'});
        setTimeout(() => {
          api2.start({x2: 0, y2: 0, visibility2: 'hidden'});
        }, 1000);
      } else if (drop1PrevCard === 3) {
        api3.start({x3: 90 + 30 + 2, y3: - 126 - 20 + 2, visibility3: 'visible'});
        setTimeout(() => {
          api3.start({x3: 0, y3: 0, visibility3: 'hidden'});
        }, 1000);
      } else if (drop1PrevCard === 4) {
        api4.start({x4: 90 + 30 + 90 + 30 + 2, y4: - 126 - 20 + 2, visibility4: 'visible'});
        setTimeout(() => {
          api4.start({x4: 0, y4: 0, visibility4: 'hidden'});
        }, 1000);
      } else if (drop1PrevCard === 5) {
        api5.start({x5: 90 + 30 + 90 + 30 + 90 + 30 + 2, y5: - 126 - 20 + 2, visibility5: 'visible'});
        setTimeout(() => {
          api5.start({x5: 0, y5: 0, visibility5: 'hidden'});
        }, 1000);
      }
      
    }
  }, [drop1Card]);

  return (
    <animated.div
      data-receive={type}
      className={`${styles.cardDrop1} ${drop1IsActive ? styles.cardDropActive : ''} ${drop1Values.length === 5 ? styles.cardDropDone : ''}`}
    >
      <div className={styles.dropCardsWrapper}>
        {(drop1PrevCard && drop1PrevCard === 1) && (
          <animated.img
            src={Card1}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x, y, visibility, zIndex: idxs.indexOf(drop1PrevCard) + 20}}
          />
        )}
        {(drop1PrevCard && drop1PrevCard === 2) && (
          <animated.img
            src={Card2}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x2, y: y2, visibility: visibility2, zIndex: idxs.indexOf(drop1PrevCard) + 20}}
          />
        )}
        {(drop1PrevCard && drop1PrevCard === 3) && (
          <animated.img
            src={Card3}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x3, y: y3, visibility: visibility3, zIndex: idxs.indexOf(drop1PrevCard) + 20}}
          />
        )}
        {(drop1PrevCard && drop1PrevCard === 4) && (
          <animated.img
            src={Card4}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x4, y: y4, visibility: visibility4, zIndex: idxs.indexOf(drop1PrevCard) + 20}}
          />
        )}
        {(drop1PrevCard && drop1PrevCard === 5) && (
          <animated.img
            src={Card5}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x5, y: y5, visibility: visibility5, zIndex: idxs.indexOf(drop1PrevCard) + 20}}
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

const CartDrop2 = ({type, idxs}: {type: number, idxs: number[]}) => {
  const drop2Card = useCardsLyaout1(s => s.drop2Card);
  const drop2PrevCard = useCardsLyaout1(s => s.drop2PrevCard);
  const drop2IsActive = useCardsLyaout1(s => s.drop2IsActive);
  const drop2Values = useCardsLyaout1(s => s.drop2Values);

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
    if (drop2PrevCard && drop2Card !== drop2PrevCard) {
      if (drop2PrevCard === 1) {
        api.start({x: - 90 - 30 - 90 - 30 + 2, y: - 126 - 20 + 2, visibility: 'visible'});
        setTimeout(() => {
          api.start({x: 0, y: 0, visibility: 'hidden'});
        }, 1000);
      } else if (drop2PrevCard === 2) {
        api2.start({x2: - 90 - 30 + 2, y2: - 126 - 20 + 2, visibility2: 'visible'});
        setTimeout(() => {
          api2.start({x2: 0, y2: 0, visibility2: 'hidden'});
        }, 1000);
      } else if (drop2PrevCard === 3) {
        api3.start({x3: 0 + 2, y3: - 126 - 20 + 2, visibility3: 'visible'});
        setTimeout(() => {
          api3.start({x3: 0, y3: 0, visibility3: 'hidden'});
        }, 1000);
      } else if (drop2PrevCard === 4) {
        api4.start({x4: 90 + 30 + 2, y4: - 126 - 20 + 2, visibility4: 'visible'});
        setTimeout(() => {
          api4.start({x4: 0, y4: 0, visibility4: 'hidden'});
        }, 1000);
      } else if (drop2PrevCard === 5) {
        api5.start({x5: 90 + 30 + 90 + 30 + 2, y5: - 126 - 20 + 2, visibility5: 'visible'});
        setTimeout(() => {
          api5.start({x5: 0, y5: 0, visibility5: 'hidden'});
        }, 1000);
      }
      
    }
  }, [drop2Card]);

  return (
    <animated.div
      data-receive={type}
      className={`${styles.cardDrop2} ${drop2IsActive ? styles.cardDropActive : ''} ${drop2Values.length === 5 ? styles.cardDropDone : ''}`}
    >
      <div className={styles.dropCardsWrapper}>
        {(drop2PrevCard && drop2PrevCard === 1) && (
          <animated.img
            src={Card1}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x, y, visibility, zIndex: idxs.indexOf(drop2PrevCard) + 20}}
          />
        )}
        {(drop2PrevCard && drop2PrevCard === 2) && (
          <animated.img
            src={Card2}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x2, y: y2, visibility: visibility2, zIndex: idxs.indexOf(drop2PrevCard) + 20}}
          />
        )}
        {(drop2PrevCard && drop2PrevCard === 3) && (
          <animated.img
            src={Card3}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x3, y: y3, visibility: visibility3, zIndex: idxs.indexOf(drop2PrevCard) + 20}}
          />
        )}
        {(drop2PrevCard && drop2PrevCard === 4) && (
          <animated.img
            src={Card4}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x4, y: y4, visibility: visibility4, zIndex: idxs.indexOf(drop2PrevCard) + 20}}
          />
        )}
        {(drop2PrevCard && drop2PrevCard === 5) && (
          <animated.img
            src={Card5}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x5, y: y5, visibility: visibility5, zIndex: idxs.indexOf(drop2PrevCard) + 20}}
          />
        )}

        {(drop2Card && drop2Card === 1) && (
          <img src={Card1} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop2Card && drop2Card === 2) && (
          <img src={Card2} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop2Card && drop2Card === 3) && (
          <img src={Card3} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop2Card && drop2Card === 4) && (
          <img src={Card4} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop2Card && drop2Card === 5) && (
          <img src={Card5} className={styles.cardItemDrop} draggable={false} />
        )}
      </div>
    </animated.div>
  );
}

const CartDrop3 = ({type, idxs}: {type: number, idxs: number[]}) => {
  const drop3Card = useCardsLyaout1(s => s.drop3Card);
  const drop3PrevCard = useCardsLyaout1(s => s.drop3PrevCard);
  const drop3IsActive = useCardsLyaout1(s => s.drop3IsActive);
  const drop3Values = useCardsLyaout1(s => s.drop3Values);

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
    if (drop3PrevCard && drop3Card !== drop3PrevCard) {
      if (drop3PrevCard === 1) {
        api.start({x: - 90 - 30 - 90 - 30 - 90 - 30 + 2, y: - 126 - 20 + 2, visibility: 'visible'});
        setTimeout(() => {
          api.start({x: 0, y: 0, visibility: 'hidden'});
        }, 1000);
      } else if (drop3PrevCard === 2) {
        api2.start({x2: - 90 - 30 - 90 - 30 + 2, y2: - 126 - 20 + 2, visibility2: 'visible'});
        setTimeout(() => {
          api2.start({x2: 0, y2: 0, visibility2: 'hidden'});
        }, 1000);
      } else if (drop3PrevCard === 3) {
        api3.start({x3: - 90 - 30 + 2, y3: - 126 - 20 + 2, visibility3: 'visible'});
        setTimeout(() => {
          api3.start({x3: 0, y3: 0, visibility3: 'hidden'});
        }, 1000);
      } else if (drop3PrevCard === 4) {
        api4.start({x4: 0 + 2, y4: - 126 - 20 + 2, visibility4: 'visible'});
        setTimeout(() => {
          api4.start({x4: 0, y4: 0, visibility4: 'hidden'});
        }, 1000);
      } else if (drop3PrevCard === 5) {
        api5.start({x5: 90 + 30 + 2, y5: - 126 - 20 + 2, visibility5: 'visible'});
        setTimeout(() => {
          api5.start({x5: 0, y5: 0, visibility5: 'hidden'});
        }, 1000);
      }
      
    }
  }, [drop3Card]);

  return (
    <animated.div
      data-receive={type}
      className={`${styles.cardDrop3} ${drop3IsActive ? styles.cardDropActive : ''} ${drop3Values.length === 5 ? styles.cardDropDone : ''}`}
    >
      <div className={styles.dropCardsWrapper}>
        {(drop3PrevCard && drop3PrevCard === 1) && (
          <animated.img
            src={Card1}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x, y, visibility, zIndex: idxs.indexOf(drop3PrevCard) + 20}}
          />
        )}
        {(drop3PrevCard && drop3PrevCard === 2) && (
          <animated.img
            src={Card2}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x2, y: y2, visibility: visibility2, zIndex: idxs.indexOf(drop3PrevCard) + 20}}
          />
        )}
        {(drop3PrevCard && drop3PrevCard === 3) && (
          <animated.img
            src={Card3}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x3, y: y3, visibility: visibility3, zIndex: idxs.indexOf(drop3PrevCard) + 20}}
          />
        )}
        {(drop3PrevCard && drop3PrevCard === 4) && (
          <animated.img
            src={Card4}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x4, y: y4, visibility: visibility4, zIndex: idxs.indexOf(drop3PrevCard) + 20}}
          />
        )}
        {(drop3PrevCard && drop3PrevCard === 5) && (
          <animated.img
            src={Card5}
            className={styles.cardItemAnimateDrop}
            draggable={false}
            style={{x: x5, y: y5, visibility: visibility5, zIndex: idxs.indexOf(drop3PrevCard) + 20}}
          />
        )}

        {(drop3Card && drop3Card === 1) && (
          <img src={Card1} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop3Card && drop3Card === 2) && (
          <img src={Card2} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop3Card && drop3Card === 3) && (
          <img src={Card3} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop3Card && drop3Card === 4) && (
          <img src={Card4} className={styles.cardItemDrop} draggable={false} />
        )}
        {(drop3Card && drop3Card === 5) && (
          <img src={Card5} className={styles.cardItemDrop} draggable={false} />
        )}
      </div>
    </animated.div>
  );
}

const Cards = ({setInfoHandler}: {setInfoHandler: (v: boolean, type: 'ERROR' | 'ANSWER') => void}) => {
  const [idxs, setIdxs] = useState<number[]>([1,2,3,4,5]);

  const setZIndex = (id: number) => {
    const a = [...idxs];
    const i = a.indexOf(id);
    const el = a.splice(i, 1);
    a.push(el[0]);
    setIdxs(a);
    setInfoHandler(false, 'ANSWER');
    setInfoHandler(false, 'ERROR');
  }

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card1} className={styles.cardItemDefault} draggable={false} />
        <Card type={1} z={idxs.indexOf(1)} setZIndex={setZIndex} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card2} className={styles.cardItemDefault} draggable={false} />
        <Card type={2} z={idxs.indexOf(2)} setZIndex={setZIndex} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card3} className={styles.cardItemDefault} draggable={false} />
        <Card type={3} z={idxs.indexOf(3)} setZIndex={setZIndex} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card4} className={styles.cardItemDefault} draggable={false} />
        <Card type={4} z={idxs.indexOf(4)} setZIndex={setZIndex} />
      </div>
      <div className={styles.card}>
        <img src={CardBG} className={styles.cardBg} draggable={false} />
        <img src={Card5} className={styles.cardItemDefault} draggable={false} />
        <Card type={5} z={idxs.indexOf(5)} setZIndex={setZIndex} />
      </div>
      <CartDrop1 type={1} idxs={idxs} />
      <CartDrop2 type={2} idxs={idxs}  />
      <CartDrop3 type={3} idxs={idxs}  />
    </div>
  );
}

const CardsDefault = () => {
  const drop1Card = useCardsLyaout1(s => s.drop1Card);
  const drop2Card = useCardsLyaout1(s => s.drop2Card);
  const drop3Card = useCardsLyaout1(s => s.drop3Card);

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
      <CartDropDefault className={styles.cardDrop1} card={drop1Card as CardsKey} />
      <CartDropDefault className={styles.cardDrop2} card={drop2Card as CardsKey} />
      <CartDropDefault className={styles.cardDrop3} card={drop3Card as CardsKey} />
    </div>
  );
}

const InputControlls = ({error, answer}: {error: boolean, answer: boolean}) => {
  const drop1Values = useCardsLyaout1(s => s.drop1Values);
  const drop2Values = useCardsLyaout1(s => s.drop2Values);
  const drop3Values = useCardsLyaout1(s => s.drop3Values);
  // input test
  // const [input1Value, setInput1Value] = useState<number>();
  // const [input1OnChange, setInput1OnChange] = useState<boolean>(false);

  // const onChangeHandler1 = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (drop1Values.length === 5) {
  //     return;
  //   }
  //   const value = Number(e.target.value);
  //   if (!isNaN(value)) {
  //     setInput1OnChange(true);
  //     setInput1Value(value);
  //   }
  // }

  // useEffect(() => {
  //   setInput1OnChange(false);
  //   console.log(drop1Values);
    
  // }, [drop1Values]);
  
  return (
    <div className={styles.inputControllsWrapper}>
      <div className={styles.controllsLabel}>Количество способов:</div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="drop1"
          id="drop1"
          className={`
            ${styles.formulaInput} ${error ? styles.errorColor : ''}  ${drop1Values.length === 5 ? styles.answerColor : ''}`}
          // onChange={onChangeHandler1}
          onChange={(e) => {}}
          // disabled
          // value={input1OnChange ? input1Value : drop1Values.length || ''}
          value={drop1Values.length || ''}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="drop2"
          id="drop2"
          className={`
            ${styles.formulaInput} ${error ? styles.errorColor : ''}  ${drop2Values.length === 5 ? styles.answerColor : ''}`}
          onChange={(e) => {}}
          // disabled
          value={drop2Values.length || ''}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="drop3"
          id="drop3"
          className={`
            ${styles.formulaInput} ${error ? styles.errorColor : ''}  ${drop3Values.length === 5 ? styles.answerColor : ''}`}
          onChange={(e) => {}}
          // disabled
          value={drop3Values.length || ''}
        />
      </div>
      <div className={styles.inputWrapper}>
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
  );
}

const InputControllsType2 = ({error, answer, value, setValueHandler, setInfoHandler}: {
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

export const CardLayout5 = () => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [value, setValue] = useState(0);
  const drop1Values = useCardsLyaout1(s => s.drop1Values);
  const drop2Values = useCardsLyaout1(s => s.drop2Values);
  const drop3Values = useCardsLyaout1(s => s.drop3Values);
  const reset = useCardsLyaout1(s => s.reset);

  const resetHandler = () => {
    setAnswer(false);
    setError(false);
    reset();
  }

  const setValueHandler = (v: number) => {
    setValue(v);
  }

  const checkStep1Handler = () => {
    if (drop1Values.length === 5 && drop2Values.length === 5 && drop3Values.length === 5) {
      setAnswer(true);
      setError(false);
      setTimeout(() => {
        setStep(1);
        setAnswer(false);
        setError(false);
      }, 500);
    } else {
      setError(true);
    }
  }

  const checkStep2Handler = () => {
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
      <h2 className={styles.title}>Размещения с повторениями</h2>
      <TableDesc taskTitle={task.taskTitle} />
      {step === 0 && (<Cards setInfoHandler={setInfoHandler} />)}
      {step === 0 && (<InputControlls answer={answer} error={error} />)}
      {step === 0 && (
        <div className={styles.submitWrapper}>
          <button
            className={styles.submitButton}
            onClick={checkStep1Handler}
          >
            <span className={styles.submitButtonLabel}>Далее</span>
            <ArrowIcon />
          </button>
        </div>
      )}
      {step === 1 && (<CardsDefault />)}
      {step === 1 && (
        <InputControllsType2
          answer={answer}
          error={error}
          value={value}
          setValueHandler={setValueHandler}
          setInfoHandler={setInfoHandler}
        />
      )}
      {step === 1 && (
        <div className={styles.submitWrapper}>
          <button
          className={styles.submitButton}
          onClick={checkStep2Handler}
        >
          Проверить
        </button>
        </div>
      )}
    </div>
  );
}

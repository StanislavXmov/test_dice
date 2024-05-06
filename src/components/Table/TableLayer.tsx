import React, { ChangeEvent, Key, useState } from 'react';

import styles from './Table.module.scss';

import Dice1 from '../icons/dice_1.svg?react';
import Dice2 from '../icons/dice_2.svg?react';
import Dice3 from '../icons/dice_3.svg?react';
import Dice4 from '../icons/dice_4.svg?react';
import Dice5 from '../icons/dice_5.svg?react';
import Dice6 from '../icons/dice_6.svg?react';

import Dice2_1 from '../icons/dice8_1.svg?react';
import Dice2_2 from '../icons/dice8_2.svg?react';
import Dice2_3 from '../icons/dice8_3.svg?react';
import Dice2_4 from '../icons/dice8_4.svg?react';
import Dice2_5 from '../icons/dice8_5.svg?react';
import Dice2_6 from '../icons/dice8_6.svg?react';
import Dice2_7 from '../icons/dice8_7.svg?react';
import Dice2_8 from '../icons/dice8_8.svg?react';

import Dice3_1 from '../icons/dice12_1.svg?react';
import Dice3_2 from '../icons/dice12_2.svg?react';
import Dice3_3 from '../icons/dice12_3.svg?react';
import Dice3_4 from '../icons/dice12_4.svg?react';
import Dice3_5 from '../icons/dice12_5.svg?react';
import Dice3_6 from '../icons/dice12_6.svg?react';
import Dice3_7 from '../icons/dice12_7.svg?react';
import Dice3_8 from '../icons/dice12_8.svg?react';
import Dice3_9 from '../icons/dice12_9.svg?react';
import Dice3_10 from '../icons/dice12_10.svg?react';
import Dice3_11 from '../icons/dice12_11.svg?react';
import Dice3_12 from '../icons/dice12_12.svg?react';
import { Cell, useTable } from '../../state/useTable';

const dicesTable = {
  1: (key: Key) => <Dice1 className={styles.diceIconTable} key={key} />,
  2: (key: Key) => <Dice2 className={styles.diceIconTable} key={key} />,
  3: (key: Key) => <Dice3 className={styles.diceIconTable} key={key} />,
  4: (key: Key) => <Dice4 className={styles.diceIconTable} key={key} />,
  5: (key: Key) => <Dice5 className={styles.diceIconTable} key={key} />,
  6: (key: Key) => <Dice6 className={styles.diceIconTable} key={key} />,
}

const dices2Table = {
  1: (key: Key) => <Dice2_1 className={styles.dice2IconTable} key={key} />,
  2: (key: Key) => <Dice2_2 className={styles.dice2IconTable} key={key} />,
  3: (key: Key) => <Dice2_3 className={styles.dice2IconTable} key={key} />,
  4: (key: Key) => <Dice2_4 className={styles.dice2IconTable} key={key} />,
  5: (key: Key) => <Dice2_5 className={styles.dice2IconTable} key={key} />,
  6: (key: Key) => <Dice2_6 className={styles.dice2IconTable} key={key} />,
  7: (key: Key) => <Dice2_7 className={styles.dice2IconTable} key={key} />,
  8: (key: Key) => <Dice2_8 className={styles.dice2IconTable} key={key} />,
}

const dices3Table = {
  1: (key: Key) => <Dice3_1 className={styles.dice3IconTable} key={key} />,
  2: (key: Key) => <Dice3_2 className={styles.dice3IconTable} key={key} />,
  3: (key: Key) => <Dice3_3 className={styles.dice3IconTable} key={key} />,
  4: (key: Key) => <Dice3_4 className={styles.dice3IconTable} key={key} />,
  5: (key: Key) => <Dice3_5 className={styles.dice3IconTable} key={key} />,
  6: (key: Key) => <Dice3_6 className={styles.dice3IconTable} key={key} />,
  7: (key: Key) => <Dice3_7 className={styles.dice3IconTable} key={key} />,
  8: (key: Key) => <Dice3_8 className={styles.dice3IconTable} key={key} />,
  9: (key: Key) => <Dice3_9 className={styles.dice3IconTable} key={key} />,
  10: (key: Key) => <Dice3_10 className={styles.dice3IconTable} key={key} />,
  11: (key: Key) => <Dice3_11 className={styles.dice3IconTable} key={key} />,
  12: (key: Key) => <Dice3_12 className={styles.dice3IconTable} key={key} />,
}

const toCaseCount = (arg: number) => {
  let titles = ['ячейка', 'ячейки', 'ячеек'];
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(arg % 100 > 4 && arg % 100 < 20) ? 2 : cases[Math.min(arg % 10, 5)]];
}

type Edge = 6 | 8 | 12;

type ViewTable = 'values' | 'sum';

const information = {
  task: 'Бросили два шестигранных кубика. Выделите в таблице ячейки, которые соответсвуют условию сумма на выпавших гранях больше 7.'
}

type Type1Edge = 1|2|3|4|5|6;
const type1Array: Type1Edge[] = [1,2,3,4,5,6];
const cells1Array: Cell[] = new Array(type1Array.length * type1Array.length).fill(null).map<Cell>((_, i) => {
  let x = (i + 1) % 6;
  if (x === 0) {
    x = 6;
  }
  const y = Math.floor(i / 6) + 1;
  
  return ({
    id: i,
    x: x,
    y: y,
  })
});

const TableType1 = ({ tableView }: {tableView: ViewTable}) => {
  const selected = useTable(s => s.selected);
  const add = useTable(s => s.add);

  return (
    <div className={styles.tableType1}>
      <div className={styles.horizontalLabelType1}>
        {type1Array.map((k) => (dicesTable[k](k)))}
      </div>
      <div className={styles.verticalLabelType1}>
        {type1Array.map((k) => (dicesTable[k](k)))}
      </div>
      <div className={styles.tableWrapperType1}>
        {cells1Array.map((c, i) => (
          <div
            key={i}
            className={`${styles.cellType1} ${selected.includes(c) ?styles.active : ''}`}
            onClick={() => add(c)}
          >
            {tableView === 'values' ? `${c.y},${c.x}` : `${c.y + c.x}`}
          </div>
        ))}
      </div>
    </div>
  );
}

type Type2Edge = 1|2|3|4|5|6|7|8;
const type2Array: Type2Edge[] = [1,2,3,4,5,6,7,8];
const cells2Array = new Array(type2Array.length * type2Array.length).fill(null);

const TableType2 = ({ tableView }: {tableView: ViewTable}) => {
  return (
    <div className={styles.tableType2}>
      <div className={styles.horizontalLabelType2}>
        {type2Array.map((k) => (dices2Table[k](k)))}
      </div>
      <div className={styles.verticalLabelType2}>
        {type2Array.map((k) => (<div key={k} className={styles.verticalIcon2}>{dices2Table[k](k)}</div>))}
      </div>
      <div className={styles.tableWrapperType2}>
        {cells2Array.map((_, i) => (
          <div key={i} className={styles.cellType2}>

          </div>
        ))}
      </div>
    </div>
  );
}

type Type3Edge = 1|2|3|4|5|6|7|8|9|10|11|12;
const type3Array: Type3Edge[] = [1,2,3,4,5,6,7,8,9,10,11,12];
const cells3Array = new Array(type3Array.length * type3Array.length).fill(null);

const TableType3 = ({ tableView }: {tableView: ViewTable}) => {
  return (
    <div className={styles.tableType3}>
      <div className={styles.horizontalLabelType3}>
        {type3Array.map((k) => (dices3Table[k](k)))}
      </div>
      <div className={styles.verticalLabelType3}>
        {type3Array.map((k) => (<div key={k} className={styles.verticalIcon3}>{dices3Table[k](k)}</div>))}
      </div>
      <div className={styles.tableWrapperType3}>
        {cells3Array.map((_, i) => (
          <div key={i} className={styles.cellType3}>

          </div>
        ))}
      </div>
    </div>
  );
}

const Table = () => {
  const [type, setType] = useState<Edge>(6);
  const [tableView, setTableView] = useState<ViewTable>('values');
  const selected = useTable(s => s.selected);
  console.log('Table');
  

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(Number(e.target.value) as Edge);
  }

  const selectTableViewHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setTableView(e.target.value as ViewTable);
  }

  return (
    <>
      <div className={styles.wrapper}>
        {type === 6 && <TableType1 tableView={tableView} />}
        {type === 8 && <TableType2 tableView={tableView} />}
        {type === 12 && <TableType3 tableView={tableView} />}
        <div className={styles.controllWrapper}>
          <label className={styles.label} htmlFor="selectType">
            Кол-во граней
            <select
              id='selectType'
              className={styles.select}
              onChange={selectHandler}
            >
              <option>6</option>
              <option>8</option>
              <option>12</option>
            </select>
          </label>
          <label className={styles.label} htmlFor="tableView">
            В таблице показаны
            <select
              id='tableView'
              className={styles.tableViewSelect}
              onChange={selectTableViewHandler}
            >
              <option value={'values'}>выпавшие значения</option>
              <option value={'sum'}>суммы ячеек</option>
            </select>
          </label>
          <div>
            {selected.length === 0 && (
              <span className={styles.selectedInfo}>
                В таблице не выбрано ячеек.
              </span>
            )}
            {selected.length > 0 && (
              <span className={styles.selectedInfo}>
                {`В таблице  выбрана ${selected.length} ${toCaseCount(selected.length)} из ${type * type}.`}
              </span>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export const TableLayer = () => {
  return (
    <div className={styles.layer}>
      <h2 className={styles.title}>Задача</h2>
      <div className={styles.desc}>
        {information.task}
      </div>
      <h2 className={styles.title}>Таблица исходов</h2>
      <div>
        <Table />
      </div>
    </div>
  );
}

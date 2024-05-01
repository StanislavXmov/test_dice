import React, { ChangeEvent, Key, useState } from 'react';

import styles from './Table.module.scss';

import Dice1 from '../icons/dice_1.svg?react';
import Dice2 from '../icons/dice_2.svg?react';
import Dice3 from '../icons/dice_3.svg?react';
import Dice4 from '../icons/dice_4.svg?react';
import Dice5 from '../icons/dice_5.svg?react';
import Dice6 from '../icons/dice_6.svg?react';

const dicesTable = {
  1: (key: Key) => <Dice1 className={styles.diceIconTable} key={key} />,
  2: (key: Key) => <Dice2 className={styles.diceIconTable} key={key} />,
  3: (key: Key) => <Dice3 className={styles.diceIconTable} key={key} />,
  4: (key: Key) => <Dice4 className={styles.diceIconTable} key={key} />,
  5: (key: Key) => <Dice5 className={styles.diceIconTable} key={key} />,
  6: (key: Key) => <Dice6 className={styles.diceIconTable} key={key} />,
}

type Edge = 6 | 8 | 12;

type ViewTable = 'values' | 'sum';

const information = {
  task: 'Бросили два шестигранных кубика. Выделите в таблице ячейки, которые соответсвуют условию сумма на выпавших гранях больше 7.'
}

type Type1Edge = 1|2|3|4|5|6;
const type1Array: Type1Edge[] = [1,2,3,4,5,6];
const cells1Array = new Array(type1Array.length * type1Array.length).fill(null);

const TableType1 = ({ tableView }: {tableView: ViewTable}) => {
  return (
    <div className={styles.tableType1}>
      <div className={styles.horizontalLabelType1}>
        {type1Array.map((k) => (dicesTable[k](k)))}
      </div>
      <div className={styles.verticalLabelType1}>
        {type1Array.map((k) => (dicesTable[k](k)))}
      </div>
      <div className={styles.tableWrapperType1}>
        {cells1Array.map((_, i) => (
          <div key={i} className={styles.cellType1}>

          </div>
        ))}
      </div>
    </div>
  );
}

const Table = () => {
  const [type, setType] = useState<Edge>(6);
  const [tableView, setTableView] = useState<ViewTable>('values');

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

import { ChangeEvent, Key, useState } from 'react';
import { Cell, Edge, useTable } from '../../state/useTable';
import { Button } from '../Button/Button';

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

type ViewTable = 'values' | 'sum';

const information = {
  '6': 'Бросили два шестигранных кубика. Выделите в таблице ячейки, которые соответсвуют условию сумма на выпавших гранях больше 7.',
  '8': 'Бросили два восьмигранных кубика. Выделите в таблице ячейки, которые соответсвуют условию сумма на выпавших гранях больше 7.',
  '12': 'Бросили два 12-гранных кубика. Выделите в таблице ячейки, которые соответсвуют условию сумма на выпавших гранях больше 7.',
}

const answer: Record<6|8|12, number[]> = {
  '6': [11,16,17,21,22,23,26,27,28,29,31,32,33,34,35],
  '8': [6,7,13,14,15,20,21,22,23,27,28,29,30,31,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],
  '12': [6,7,8,9,10,11,17,18,19,20,21,22,23,28,29,30,31,32,33,34,35,39,40,41,42,43,44,45,46,47,50,51,52,53,54,55,56,57,58,59,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143],
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

const findedAllY = (cells: Cell[], idx: number, typeCount: number) => {
  let allFinded = true;

  for (let i = 0; i < typeCount; i++) {
    const id = (i * typeCount) + idx;
    const findes = cells.find(f => f.id === id);
    if (!findes) {
      allFinded = false;
    }
  }
  
  return allFinded;
}

const findedAllX = (cells: Cell[], idx: number, typeCount: number) => {
  let allFinded = true;

  for (let i = 0; i < typeCount; i++) {
    const id = (idx * typeCount) + i;
    const findes = cells.find(f => f.id === id);
    if (!findes) {
      allFinded = false;
    }
  }
  
  return allFinded;
}

const TableType1 = ({ tableView }: {tableView: ViewTable}) => {
  const selected = useTable(s => s.selected);
  const add = useTable(s => s.add);
  const addMore = useTable(s => s.addMore);
  const removeIds = useTable(s => s.removeIds); 

  const horizontalLabelHandler = (k: Type1Edge, idx: number) => {
    if (findedAllY(selected, idx, 6)) {
      const ids: number[] = [];
      for (let i = 0; i < type1Array.length; i++) {
        const id = (i * 6) + idx;
        ids.push(id);
      }
      removeIds(ids);
      return;
    }
    
    const cells: Cell[] = [];
    for (let i = 0; i < type1Array.length; i++) {
      const id = (i * 6) + idx;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        cells.push({
          id,
          x: k,
          y: i + 1,
        });
      }
    }
    addMore(cells);
  }

  const verticalLabelHandler = (k: Type1Edge, idx: number) => {
    if (findedAllX(selected, idx, 6)) {
      const ids: number[] = [];
      for (let i = 0; i < type1Array.length; i++) {
        const id = (idx * 6) + i;
        ids.push(id);
      }
      removeIds(ids);
      return;
    }
    
    const cells: Cell[] = [];
    
    for (let i = 0; i < type1Array.length; i++) {
      const id = (idx * 6) + i;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        cells.push({
          id,
          x: i + 1,
          y: k,
        });
      }
    }
    addMore(cells);
  }

  const includes = (c: Cell) => {
    const finded = selected.find(f => f.id === c.id);
    if (finded) {
      return true;
    } else {
      return false
    }
  }

  return (
    <div className={styles.tableType1}>
      <div className={styles.horizontalLabelType1}>
        {type1Array.map((k, i) => <div key={k} onClick={() => horizontalLabelHandler(k, i)}>{dicesTable[k](k)}</div>)}
      </div>
      <div className={styles.verticalLabelType1}>
        {type1Array.map((k, i) => <div key={k} onClick={() => verticalLabelHandler(k, i)} className={styles.diceIconWrapper}>{dicesTable[k](k)}</div>)}
      </div>
      <div className={styles.tableWrapperType1}>
        {cells1Array.map((c, i) => (
          <div
            key={i}
            className={`${styles.cellType1} ${includes(c) ? styles.active : ''}`}
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
const cells2Array = new Array(type2Array.length * type2Array.length).fill(null).map<Cell>((_, i) => {
  let x = (i + 1) % 8;
  if (x === 0) {
    x = 8;
  }
  const y = Math.floor(i / 8) + 1;
  
  return ({
    id: i,
    x: x,
    y: y,
  })
});

const TableType2 = ({ tableView }: {tableView: ViewTable}) => {
  const selected = useTable(s => s.selected);
  const add = useTable(s => s.add);
  const addMore = useTable(s => s.addMore);
  const removeIds = useTable(s => s.removeIds);

  const horizontalLabelHandler = (k: Type2Edge, idx: number) => {
    if (findedAllY(selected, idx, 8)) {
      const ids: number[] = [];
      for (let i = 0; i < type2Array.length; i++) {
        const id = (i * 8) + idx;
        ids.push(id);
      }
      removeIds(ids);
      return;
    }
    
    const cells: Cell[] = [];
    for (let i = 0; i < type2Array.length; i++) {
      const id = (i * 8) + idx;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        cells.push({
          id,
          x: k,
          y: i + 1,
        });
      }
    }
    addMore(cells);
  }

  const verticalLabelHandler = (k: Type2Edge, idx: number) => {
    if (findedAllX(selected, idx, 8)) {
      const ids: number[] = [];
      for (let i = 0; i < type2Array.length; i++) {
        const id = (idx * 8) + i;
        ids.push(id);
      }
      removeIds(ids);
      return;
    }
    
    const cells: Cell[] = [];
    
    for (let i = 0; i < type2Array.length; i++) {
      const id = (idx * 8) + i;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        cells.push({
          id,
          x: i + 1,
          y: k,
        });
      }
    }
    addMore(cells);
  }

  const includes = (c: Cell) => {
    const finded = selected.find(f => f.id === c.id);
    if (finded) {
      return true;
    } else {
      return false
    }
  }

  return (
    <div className={styles.tableType2}>
      <div className={styles.horizontalLabelType2}>
        {type2Array.map((k, i) => <div key={k} onClick={() => horizontalLabelHandler(k, i)}>{dices2Table[k](k)}</div>)}
      </div>
      <div className={styles.verticalLabelType2}>
        {type2Array.map((k, i) => (<div key={k} onClick={() => verticalLabelHandler(k, i)} className={styles.verticalIcon2}>{dices2Table[k](k)}</div>))}
      </div>
      <div className={styles.tableWrapperType2}>
        {cells2Array.map((c, i) => (
          <div
            key={i}
            className={`${styles.cellType2} ${includes(c) ?styles.active : ''}`}
            onClick={() => add(c)}
          >
            {tableView === 'values' ? `${c.y},${c.x}` : `${c.y + c.x}`}
          </div>
        ))}
      </div>
    </div>
  );
}

type Type3Edge = 1|2|3|4|5|6|7|8|9|10|11|12;
const type3Array: Type3Edge[] = [1,2,3,4,5,6,7,8,9,10,11,12];
const cells3Array = new Array(type3Array.length * type3Array.length).fill(null).map<Cell>((_, i) => {
  let x = (i + 1) % 12;
  if (x === 0) {
    x = 12;
  }
  const y = Math.floor(i / 12) + 1;
  
  return ({
    id: i,
    x: x,
    y: y,
  })
});

const TableType3 = ({ tableView }: {tableView: ViewTable}) => {
  const selected = useTable(s => s.selected);
  const add = useTable(s => s.add);
  const addMore = useTable(s => s.addMore);
  const removeIds = useTable(s => s.removeIds);

  const horizontalLabelHandler = (k: Type3Edge, idx: number) => {
    if (findedAllY(selected, idx, 12)) {
      const ids: number[] = [];
      for (let i = 0; i < type3Array.length; i++) {
        const id = (i * 12) + idx;
        ids.push(id);
      }
      removeIds(ids);
      return;
    }
    
    const cells: Cell[] = [];
    for (let i = 0; i < type3Array.length; i++) {
      const id = (i * 12) + idx;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        cells.push({
          id,
          x: k,
          y: i + 1,
        });
      }
    }
    addMore(cells);
  }

  const verticalLabelHandler = (k: Type3Edge, idx: number) => {
    if (findedAllX(selected, idx, 12)) {
      const ids: number[] = [];
      for (let i = 0; i < type3Array.length; i++) {
        const id = (idx * 12) + i;
        ids.push(id);
      }
      removeIds(ids);
      return;
    }
    
    const cells: Cell[] = [];
    
    for (let i = 0; i < type3Array.length; i++) {
      const id = (idx * 12) + i;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        cells.push({
          id,
          x: i + 1,
          y: k,
        });
      }
    }
    addMore(cells);
  }

  const includes = (c: Cell) => {
    const finded = selected.find(f => f.id === c.id);
    if (finded) {
      return true;
    } else {
      return false
    }
  }

  return (
    <div className={styles.tableType3}>
      <div className={styles.horizontalLabelType3}>
        {type3Array.map((k, i) => <div key={k} onClick={() => horizontalLabelHandler(k, i)}>{dices3Table[k](k)}</div>)}
      </div>
      <div className={styles.verticalLabelType3}>
        {type3Array.map((k, i) => (<div key={k} onClick={() => verticalLabelHandler(k, i)} className={styles.verticalIcon3}>{dices3Table[k](k)}</div>))}
      </div>
      <div className={styles.tableWrapperType3}>
        {cells3Array.map((c, i) => (
          <div
            key={i}
            className={`${styles.cellType3} ${includes(c) ?styles.active : ''}`}
            onClick={() => add(c)}
          >
            {tableView === 'values' ? `${c.y},${c.x}` : `${c.y + c.x}`}
          </div>
        ))}
      </div>
    </div>
  );
}

const Table = () => {
  const [tableView, setTableView] = useState<ViewTable>('values');
  const [disabled, setDisabled] = useState(false);

  const [valueAnswer, setValueAnswer] = useState(false);

  const type = useTable(s => s.type);
  const setType = useTable(s => s.setType);
  const selected = useTable(s => s.selected);
  const clear = useTable(s => s.clear);
  // console.log(selected);
  
  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(Number(e.target.value) as Edge);
    clear();
  }

  const selectTableViewHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setTableView(e.target.value as ViewTable);
  }

  const checkHandler = () => {
    let finded = true;
    const answerList = answer[type];

    if (answerList.length !== selected.length) {
      finded = false;
      setValueAnswer(finded);
      return;
    }

    for (let i = 0; i < answerList.length; i++) {
      const id = answerList[i];
      if (selected.find(c => c.id === id)) {
        continue;
      } else {
        finded = false;
        break;
      } 
    }

    setValueAnswer(finded);
  }

  return (
    <>
      <div className={styles.wrapper}>
        {type === 6 && <TableType1 tableView={tableView} />}
        {type === 8 && <TableType2 tableView={tableView} />}
        {type === 12 && <TableType3 tableView={tableView} />}
        <div className={
          `${styles.controllWrapper} ${type === 8 ? styles.controllMarginType2 : ''} ${type === 12 ? styles.controllMarginType3 : ''}`
          }>
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
      <div className={`${styles.checkWrapper} ${type === 8 ? styles.checkWrapperMarginType2 : ''} ${type === 12 ? styles.checkWrapperMarginType3 : ''}`}>
        <Button
          // test
          title={`Проверить${valueAnswer ? ' верно' : ''}`}
          disabled={disabled}
          cb={checkHandler}
          setDisabled={setDisabled}
          timeout={1000}
        />
      </div>
    </>
  );
}

const TableDesc = () => {
  const type = useTable(s => s.type);
  return (
    <div className={styles.desc}>
      {type === 6 && information[6]}
      {type === 8 && information[8]}
      {type === 12 && information[12]}
    </div>
  );
}

export const TableLayer = () => {
  return (
    <div className={styles.layer}>
      <h2 className={styles.title}>Задача</h2>
      <TableDesc />
      <h2 className={styles.title}>Таблица исходов</h2>
      <div>
        <Table />
      </div>
    </div>
  );
}

import { ChangeEvent, Key, useState } from 'react';
import random from 'random';
import { Cell, Edge, useTableType1 } from '../../state/useTable';
import { Button } from '../Button/Button';

import tasks from './tasks1.json';

import styles from './OneConditionTable.module.scss';

import Dice1 from '../icons/dice_1.svg?react';
import Dice2 from '../icons/dice_2.svg?react';
import Dice3 from '../icons/dice_3.svg?react';
import Dice4 from '../icons/dice_4.svg?react';
import Dice5 from '../icons/dice_5.svg?react';
import Dice6 from '../icons/dice_6.svg?react';

import ResetIcon from '../icons/reset2.svg?react';

const dicesTable = {
  1: (key: Key) => <Dice1 className={styles.diceIconTable} key={key} />,
  2: (key: Key) => <Dice2 className={styles.diceIconTable} key={key} />,
  3: (key: Key) => <Dice3 className={styles.diceIconTable} key={key} />,
  4: (key: Key) => <Dice4 className={styles.diceIconTable} key={key} />,
  5: (key: Key) => <Dice5 className={styles.diceIconTable} key={key} />,
  6: (key: Key) => <Dice6 className={styles.diceIconTable} key={key} />,
}

interface ButtonProps {
  cb: () => void;
}

export const ResetButton = ({cb}: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={cb}
    >
      <ResetIcon className={styles.icon} />
    </button>
  );
}

type Task = {
  task: string;
  answer: string;
  reductable: "yes" | "no";
}

const TableDesc = ({task}: {task: Task}) => {
  const type = useTableType1(s => s.type);
  return (
    <div className={styles.desc}>
      {task.task}
    </div>
  );
}

const getTask = () => {
  const l = tasks.length;
  const n = random.int(0, l - 1);
  return tasks[n] as Task;
}

type ViewTable = 'values' | 'sum';

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
  const selected = useTableType1(s => s.selected);
  const add = useTableType1(s => s.add);
  const addMore = useTableType1(s => s.addMore);
  const removeIds = useTableType1(s => s.removeIds); 

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

const Table = ({tableView}: {tableView: ViewTable }) => {
  const [valueAnswer, setValueAnswer] = useState(false);

  const type = useTableType1(s => s.type);
  const setType = useTableType1(s => s.setType);
  const selected = useTableType1(s => s.selected);
  const clear = useTableType1(s => s.clear);
  // console.log(selected);

  const checkHandler = () => {
    // let finded = true;
    // const answerList = answer[type];

    // if (answerList.length !== selected.length) {
    //   finded = false;
    //   setValueAnswer(finded);
    //   return;
    // }

    // for (let i = 0; i < answerList.length; i++) {
    //   const id = answerList[i];
    //   if (selected.find(c => c.id === id)) {
    //     continue;
    //   } else {
    //     finded = false;
    //     break;
    //   } 
    // }

    // setValueAnswer(finded);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <TableType1 tableView={tableView} />
        <div className={styles.controllWrapper}>
          <div className={styles.label}>
            <div className={styles.labelTitle}>Вероятность</div>
            <div className={styles.calcWrapper}>
              <span className={styles.formulaText}>P =</span>
              <div className={styles.formulaWrapper}>
                <input
                  type="number"
                  name="probability"
                  id="probability"
                  className={styles.formulaInput}
                />
                <div className={styles.formulaBorder}></div>
                <div className={styles.formulaText}>36</div>
              </div>
            </div>
          </div>
          <button className={styles.submitButton}>Проверить</button>
        </div>
      </div>
    </>
  );
}

export const OneConditionTable = () => {
  const [task, setTask] = useState<Task>(getTask());
  const [tableView, setTableView] = useState<ViewTable>('values');
  const clear = useTableType1(s => s.clear);

  const resetHandler = () => {
    clear();
    setTask(getTask());
  }

  const selectTableViewHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setTableView(e.target.value as ViewTable);
  }

  return (
    <div className={styles.layer}>
      <ResetButton cb={resetHandler} />
      <h2 className={styles.title}>Задача</h2>
      <TableDesc task={task} />
      <div className={styles.tableTitleWrapper}>
        <h2 className={styles.title}>Таблица исходов</h2>
        <select
          id='tableView1'
          className={styles.select}
          onChange={selectTableViewHandler}
        >
          <option value={'values'}>со значениями</option>
          <option value={'sum'}>с суммами</option>
        </select>
      </div>
      <div className={styles.tablwWrapper}>
        <Table tableView={tableView} />
      </div>
    </div>
  );
}

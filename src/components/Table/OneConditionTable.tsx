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
        {/* <Table /> */}
      </div>
    </div>
  );
}

import { ChangeEvent, Key, useEffect, useState } from 'react';
import random from 'random';
import { TwoConditionCell, Type, useSolutionTable } from '../../state/useTable';

import styles from './SolutionTable.module.scss';

import "katex/dist/katex.min.css";

import Dice1 from '../icons/dice_1.svg?react';
import Dice2 from '../icons/dice_2.svg?react';
import Dice3 from '../icons/dice_3.svg?react';
import Dice4 from '../icons/dice_4.svg?react';
import Dice5 from '../icons/dice_5.svg?react';
import Dice6 from '../icons/dice_6.svg?react';

import ResetIcon from '../icons/reset2.svg?react';
import ResetCellsIcon from '../icons/close.svg?react';
import ArrowIcon from '../icons/arrow.svg?react';

type Task = {
  task: string;
  answer: string;
  reductable: "yes" | "no";
}

type ViewTable = 'values' | 'sum';

const getTask = () => {
  return {
    task: "Пусть событие А — «за два броска игральной кости 3 очка не выпало ни разу», а событие В — «сумма очков после двух бросков не превосходит 9».",
    answer: "11/36",
    reductable: "no"
  } as Task;
}

const dicesTable = {
  1: (key: Key) => <Dice1 className={styles.diceIconTable} key={key} />,
  2: (key: Key) => <Dice2 className={styles.diceIconTable} key={key} />,
  3: (key: Key) => <Dice3 className={styles.diceIconTable} key={key} />,
  4: (key: Key) => <Dice4 className={styles.diceIconTable} key={key} />,
  5: (key: Key) => <Dice5 className={styles.diceIconTable} key={key} />,
  6: (key: Key) => <Dice6 className={styles.diceIconTable} key={key} />,
}

type Type1Edge = 1 | 2 | 3 | 4 | 5 | 6;
const type1Array: Type1Edge[] = [1, 2, 3, 4, 5, 6];
const cells1Array: TwoConditionCell[] = new Array(type1Array.length * type1Array.length).fill(null).map<TwoConditionCell>((_, i) => {
  let x = (i + 1) % 6;
  if (x === 0) {
    x = 6;
  }
  const y = Math.floor(i / 6) + 1;

  return ({
    id: i,
    x: x,
    y: y,
    type1: false,
    type2: false,
    type3: false,
  })
});

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

const TableDesc = ({ task }: { task: Task }) => {
  return (
    <div className={styles.desc}>
      {task.task}
    </div>
  );
}

const findedAllY = (cells: TwoConditionCell[], idx: number, typeCount: number, type: Type) => {
  let allFinded = true;

  for (let i = 0; i < typeCount; i++) {
    const id = (i * typeCount) + idx;
    if (type === 'Type1') {
      const findes = cells.find(f => f.id === id && f.type1);
      if (!findes) {
        allFinded = false;
      }
    } else if (type === 'Type2') {
      const findes = cells.find(f => f.id === id && f.type2);
      if (!findes) {
        allFinded = false;
      }
    }
  }

  return allFinded;
}

const findedAllX = (cells: TwoConditionCell[], idx: number, typeCount: number, type: Type) => {
  let allFinded = true;

  for (let i = 0; i < typeCount; i++) {
    const id = (idx * typeCount) + i;
    if (type === 'Type1') {
      const findes = cells.find(f => f.id === id && f.type1);
      if (!findes) {
        allFinded = false;
      }
    } else if (type === 'Type2') {
      const findes = cells.find(f => f.id === id && f.type2);
      if (!findes) {
        allFinded = false;
      }
    }
  }

  return allFinded;
}

const TableType1 = ({ tableView }: { tableView: ViewTable }) => {
  const selected = useSolutionTable(s => s.selected);
  const type = useSolutionTable(s => s.type);
  const add = useSolutionTable(s => s.add);
  const addMore = useSolutionTable(s => s.addMore);
  const removeIds = useSolutionTable(s => s.removeIds);

  const horizontalLabelHandler = (k: Type1Edge, idx: number) => {
    if (type === 'Type3') {
      return;
    }
    
    if (findedAllY(selected, idx, 6, type)) {
      const ids: number[] = [];
      for (let i = 0; i < type1Array.length; i++) {
        const id = (i * 6) + idx;
        if (type === 'Type1') {
          const findes = selected.find(f => f.id === id);
          if (!findes.type2) {
            ids.push(id);
            const f = cells1Array.find(f => f.id === id);
            f.type1 = false;
          } else {
            findes.type1 = false;
            if (findes.type3) {
              findes.type3 = false;
            }
          }
        } else if (type === 'Type2') {
          const findes = selected.find(f => f.id === id);
          if (!findes.type1) {
            ids.push(id);
            const f = cells1Array.find(f => f.id === id);
            f.type2 = false;
          } else {
            findes.type2 = false;
            if (findes.type3) {
              findes.type3 = false;
            }
          }
        }
      }
      removeIds(ids);
      return;
    }

    const cells: TwoConditionCell[] = [];
    for (let i = 0; i < type1Array.length; i++) {
      const id = (i * 6) + idx;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        const c = cells1Array.find(f => f.id === id);
        if (type === 'Type1') {
          c.type1 = true;
        } else if (type === 'Type2') {
          c.type2 = true;
        }
        cells.push(c);
      } else {
        if (type === 'Type1') {
          if (finded.type2) {
            finded.type1 = true;
            finded.type3 = true;
          }
        } else if (type === 'Type2') {
          if (finded.type1) {
            finded.type2 = true;
            finded.type3 = true;
          }
        }
      }
    }
    addMore(cells);
  }

  const verticalLabelHandler = (k: Type1Edge, idx: number) => {
    if (findedAllX(selected, idx, 6, type)) {
      const ids: number[] = [];
      for (let i = 0; i < type1Array.length; i++) {
        const id = (idx * 6) + i;
        if (type === 'Type1') {
          const findes = selected.find(f => f.id === id);
          if (!findes.type2) {
            ids.push(id);
            const f = cells1Array.find(f => f.id === id);
            f.type1 = false;
          } else {
            findes.type1 = false;
            if (findes.type3) {
              findes.type3 = false;
            }
          }
        } else if (type === 'Type2') {
          const findes = selected.find(f => f.id === id);
          if (!findes.type1) {
            ids.push(id);
            const f = cells1Array.find(f => f.id === id);
            f.type2 = false;
          } else {
            findes.type2 = false;
            if (findes.type3) {
              findes.type3 = false;
            }
          }
        }
      }
      removeIds(ids);
      return;
    }

    const cells: TwoConditionCell[] = [];

    for (let i = 0; i < type1Array.length; i++) {
      const id = (idx * 6) + i;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        const c = cells1Array.find(f => f.id === id);
        if (type === 'Type1') {
          c.type1 = true;
        } else if (type === 'Type2') {
          c.type2 = true;
        }
        cells.push(c);
      } else {
        if (type === 'Type1') {
          if (finded.type2) {
            finded.type1 = true;
            finded.type3 = true;
          }
        } else if (type === 'Type2') {
          if (finded.type1) {
            finded.type2 = true;
            finded.type3 = true;
          }
        }
      }
    }
    addMore(cells);
  }

  const includes = (c: TwoConditionCell) => {
    const finded = selected.find(f => f.id === c.id);
    if (finded) {
      return true;
    } else {
      return false
    }
  }

  const getType = (c: TwoConditionCell, type: Type) => {
    if (type === 'Type1') {
      if (c.type1) {
        return styles.activeTape1;
      } else {
        return '';
      }
    } else if (type === 'Type2') {
      if (c.type2) {
        return styles.activeTape2;
      } else {
        return '';
      }
    } else if (type === 'Type3') {
      if (c.type3) {
        return styles.activeTape3;
      } else if (c.type2) {
        return styles.activeTape2;
      } else if (c.type1) {
        return styles.activeTape1;
      } else {
        return '';
      }
    }
  }

  const getTypeClass = (type: Type) => {
    if (type === 'Type1') {
      return styles.cellsResetButtonType1;
    } else if (type === 'Type2') {
      return styles.cellsResetButtonType2;
    } else if (type === 'Type3') {
      return styles.cellsResetButtonType3;
    }
    return '';
  }

  const resetCellsHandler = () => {
    const ids: number[] = [];
    selected.forEach(c => {
      if (type === 'Type1') {
        c.type1 = false;
        if (c.type3) {
          c.type3 = false;
        }
      } else if (type === 'Type2') {
        c.type2 = false;
        if (c.type3) {
          c.type3 = false;
        }
      } else if (type === 'Type3') {
        c.type3 = false;
        c.type1 = false;
        c.type2 = false;
      }
      if (!c.type1 && !c.type2 && !c.type3) {
        ids.push(c.id);
      }
    });

    cells1Array.forEach(c => {
      if (type === 'Type1') {
        c.type1 = false;
        if (c.type3) {
          c.type3 = false;
        }
      } else if (type === 'Type2') {
        c.type2 = false;
        if (c.type3) {
          c.type3 = false;
        }
      } else if (type === 'Type3') {
        c.type3 = false;
        c.type1 = false;
        c.type2 = false;
      }
    });
    if (ids.length > 0) {
      removeIds(ids);
    } else {
      addMore([]);
    }
  }

  return (
    <div className={styles.tableType1}>
      <div className={styles.cellsResetWrapper}>
        <button
          onClick={resetCellsHandler}
          className={`${styles.cellsResetButton} ${getTypeClass(type)}`}
        >
          <ResetCellsIcon />
        </button>
      </div>
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
            className={`${styles.cellType1} ${includes(c) ? getType(c, type) : ''}`}
            onClick={() => add(c)}
          >
            {tableView === 'values' ? `${c.y};${c.x}` : `${c.y + c.x}`}
          </div>
        ))}
      </div>
    </div> 
  );
}

const Table = ({ tableView, task, error, answer, setErrorHandler, isNewTask }: {
  tableView: ViewTable;
  task: Task;
  setErrorHandler: (v: boolean, type: 'error' | 'answer') => void;
  error: boolean;
  answer: boolean;
  isNewTask: boolean;
}) => {
  const [n, setN] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const setStep = useSolutionTable(s => s.setStep);
  const step = useSolutionTable(s => s.step);

  const checkHandler = () => {
    setStep(step + 1);
    // if (task.reductable === 'no') {
    //   const v = task.answer === `${n}/36`;
    //   if (v) {
    //     setErrorHandler(true, 'answer');
    //     setErrorHandler(false, 'error');
    //   } else {
    //     setErrorHandler(true, 'error');
    //   }
    // } else {
    //   const v = task.answer === `${a}/${b}`;
    //   if (v) {
    //     setErrorHandler(true, 'answer');
    //     setErrorHandler(false, 'error');
    //   } else {
    //     setErrorHandler(true, 'error');
    //   }
    // }
  }

  const formulaNInput = (e: ChangeEvent<HTMLInputElement>, type: 'n' | 'a' | 'b') => {
    if (type === 'n') {
      setN(e.target.value);
    } else if (type === 'a') {
      setA(e.target.value);
    } else if (type === 'b') {
      setB(e.target.value);
    }
  }

  useEffect(() => {
    if (isNewTask) {
      setN('');
      setA('');
      setB('');
    }
    
  }, [isNewTask])

  return (
    <>
      <div className={styles.wrapper}>
        <TableType1 tableView={tableView} />
        <div className={styles.controllWrapper}>
          {step}
          {/* <div className={styles.label}>
            <div className={styles.labelTitle}>Вероятность</div>
            <div className={styles.calc}>
              <div className={styles.calcWrapper}>
                <span className={styles.formulaText}>P =</span>
                <div className={styles.formulaWrapper}>
                  <input
                    type="text"
                    name="probabilityN"
                    id="probabilityN"
                    className={`
                      ${styles.formulaInput} ${task.reductable === 'no' && error ? styles.errorColor : ''}  ${task.reductable === 'no' && answer ? styles.answerColor : ''}`}
                    onChange={(e) => formulaNInput(e, 'n')}
                    value={n}
                  />
                  <div className={styles.formulaBorder}></div>
                  <div className={styles.formulaNumber}>36</div>
                </div>
              </div>
              {task.reductable === 'yes' && (
                <div className={styles.calcWrapper}>
                  <span className={styles.formulaText}>&nbsp;=</span>
                  <div className={styles.formulaWrapper}>
                    <input
                      type="text"
                      name="probabilityA"
                      id="probabilityA"
                      className={`${styles.formulaInput} ${error ? styles.errorColor : ''} ${answer ? styles.answerColor : ''}`}
                      onChange={(e) => formulaNInput(e, 'a')}
                      value={a}
                    />
                    <div className={styles.formulaBorder}></div>
                    <input
                      type="text"
                      name="probabilityB"
                      id="probabilityB"
                      className={
                        `${styles.formulaInput} ${error ? styles.errorColor : ''} ${answer ? styles.answerColor : ''}`}
                      onChange={(e) => formulaNInput(e, 'b')}
                      value={b}
                    />
                  </div>
                </div>
              )}
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
          </div> */}
          <button
            className={styles.submitButton}
            onClick={checkHandler}
          >
            <span className={styles.submitButtonLabel}>Далее</span>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </>
  );
}

const EventControll = () => {
  const setType = useSolutionTable(s => s.setType);
  const activeType = useSolutionTable(s => s.type);

  const setActiveTypeHandler = (type: Type) => {
    setType(type);
  }

  return (
    <div className={styles.eventControllWrapper}>
      <button
        onClick={() => setActiveTypeHandler('Type1')}
        className={`${styles.eventButtonType1} ${activeType === 'Type1' ? styles.eventButtonType1Active : ''}`}
      >
        Событие A
      </button>
      <button
        onClick={() => setActiveTypeHandler('Type2')}
        className={`${styles.eventButtonType2} ${activeType === 'Type2' ? styles.eventButtonType2Active : ''}`}
      >
        Событие B
      </button>
      <button
        onClick={() => setActiveTypeHandler('Type3')}
        className={`${styles.eventButtonType3} ${activeType === 'Type3' ? styles.eventButtonType3Active : ''}`}
      >
        всё вместе
      </button>
    </div>
  );
}

export const SolutionTable = () => {
  const [task, setTask] = useState<Task>(getTask());
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);

  const [tableView, setTableView] = useState<ViewTable>('values');
  const clear = useSolutionTable(s => s.clear);
  const setType = useSolutionTable(s => s.setType);

  const resetHandler = () => {
    clear();
    setTask(getTask());
    setError(false);
    setAnswer(false);
    setIsNewTask(true);
    cells1Array.forEach(c => {
      c.type1 = false;
      c.type2 = false;
      c.type3 = false;
    });
    setType('Type1');
    setTimeout(() => {
      setIsNewTask(false);
    }, 500);
  }

  const setErrorHandler = (v: boolean, type: 'error' | 'answer') => {
    if (type === 'error') {
      setError(v);
    } else if (type === 'answer') {
      setAnswer(v);
    }
  }

  const selectTableViewHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setTableView(e.target.value as ViewTable);
  }

  return (
    <div className={styles.layer}>
      <ResetButton cb={resetHandler} />
      <h2 className={styles.title}>Решение задач на условную вероятность</h2>
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
      <EventControll />
      <div className={styles.tablwWrapper}>
        <Table
          tableView={tableView}
          task={task} answer={answer}
          error={error}
          setErrorHandler={setErrorHandler}
          isNewTask={isNewTask}
        />
      </div>
    </div>
  );
}

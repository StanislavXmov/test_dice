import { Key } from 'react';
import { TwoConditionCell, Type, useOutcomeTable } from '../../../state/useTable';
import { findedAllX, findedAllY } from './TableType1';

import styles from '../OutcomeTable.module.scss';

import Dice2_1 from '../../icons/dice8_1.svg?react';
import Dice2_2 from '../../icons/dice8_2.svg?react';
import Dice2_3 from '../../icons/dice8_3.svg?react';
import Dice2_4 from '../../icons/dice8_4.svg?react';
import Dice2_5 from '../../icons/dice8_5.svg?react';
import Dice2_6 from '../../icons/dice8_6.svg?react';
import Dice2_7 from '../../icons/dice8_7.svg?react';
import Dice2_8 from '../../icons/dice8_8.svg?react';
import ResetIcon from '../../icons/close.svg?react';

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

type ViewTable = 'values' | 'sum';

type Type2Edge = 1|2|3|4|5|6|7|8;
const type2Array: Type2Edge[] = [1,2,3,4,5,6,7,8];

export const TableType2 = ({ tableView, cells2Array }: {tableView: ViewTable; cells2Array: TwoConditionCell[]}) => {
  const selected = useOutcomeTable(s => s.selected);
  const type = useOutcomeTable(s => s.cellType);
  const add = useOutcomeTable(s => s.add);
  const addMore = useOutcomeTable(s => s.addMore);
  const removeIds = useOutcomeTable(s => s.removeIds);

  const horizontalLabelHandler = (k: Type2Edge, idx: number) => {
    if (findedAllY(selected, idx, 8, type)) {
      const ids: number[] = [];
      for (let i = 0; i < type2Array.length; i++) {
        const id = (i * 8) + idx;
        if (type === 'Type1') {
          const findes = selected.find(f => f.id === id);
          if (!findes.type2) {
            ids.push(id);
            const f = cells2Array.find(f => f.id === id);
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
            const f = cells2Array.find(f => f.id === id);
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
    for (let i = 0; i < type2Array.length; i++) {
      const id = (i * 8) + idx;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        const c = cells2Array.find(f => f.id === id);
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

  const verticalLabelHandler = (k: Type2Edge, idx: number) => {
    if (findedAllX(selected, idx, 8, type)) {
      const ids: number[] = [];
      for (let i = 0; i < type2Array.length; i++) {
        const id = (idx * 8) + i;
        if (type === 'Type1') {
          const findes = selected.find(f => f.id === id);
          if (!findes.type2) {
            ids.push(id);
            const f = cells2Array.find(f => f.id === id);
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
            const f = cells2Array.find(f => f.id === id);
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
    
    for (let i = 0; i < type2Array.length; i++) {
      const id = (idx * 8) + i;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        const c = cells2Array.find(f => f.id === id);
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
    });
    cells2Array.forEach(c => {
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
    addMore([]);
  }

  return (
    <div className={styles.tableType2}>
      <div className={styles.cellsResetWrapper}>
        <button
          onClick={resetCellsHandler}
          className={`${styles.cellsResetButton} ${getTypeClass(type)}`}
        >
          <ResetIcon />
        </button>
      </div>
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
            className={`${styles.cellType2} ${includes(c) ? getType(c, type) : ''}`}
            onClick={() => add(c)}
          >
            {tableView === 'values' ? `${c.y};${c.x}` : `${c.y + c.x}`}
          </div>
        ))}
      </div>
    </div>
  );
}
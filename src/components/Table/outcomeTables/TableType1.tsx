import { Key } from 'react';
import { TwoConditionCell, Type, useOutcomeTable } from '../../../state/useTable';

import styles from '../OutcomeTable.module.scss';

import Dice1 from '../../icons/dice_1.svg?react';
import Dice2 from '../../icons/dice_2.svg?react';
import Dice3 from '../../icons/dice_3.svg?react';
import Dice4 from '../../icons/dice_4.svg?react';
import Dice5 from '../../icons/dice_5.svg?react';
import Dice6 from '../../icons/dice_6.svg?react';
import ResetIcon from '../../icons/close.svg?react';

const dicesTable = {
  1: (key: Key) => <Dice1 className={styles.diceIconTable} key={key} />,
  2: (key: Key) => <Dice2 className={styles.diceIconTable} key={key} />,
  3: (key: Key) => <Dice3 className={styles.diceIconTable} key={key} />,
  4: (key: Key) => <Dice4 className={styles.diceIconTable} key={key} />,
  5: (key: Key) => <Dice5 className={styles.diceIconTable} key={key} />,
  6: (key: Key) => <Dice6 className={styles.diceIconTable} key={key} />,
}

type ViewTable = 'values' | 'sum';

type Type1Edge = 1 | 2 | 3 | 4 | 5 | 6;
const type1Array: Type1Edge[] = [1, 2, 3, 4, 5, 6];

export const findedAllY = (cells: TwoConditionCell[], idx: number, typeCount: number, type: Type) => {
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

export const findedAllX = (cells: TwoConditionCell[], idx: number, typeCount: number, type: Type) => {
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

export const TableType1 = ({ tableView, cells1Array }: { tableView: ViewTable; cells1Array: TwoConditionCell[] }) => {
  const selected = useOutcomeTable(s => s.selected);
  const type = useOutcomeTable(s => s.cellType);
  const add = useOutcomeTable(s => s.add);
  const addMore = useOutcomeTable(s => s.addMore);
  const removeIds = useOutcomeTable(s => s.removeIds);
  console.log(selected);
  

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

  const getCellsCount = (type: Type) => {
    let cells = [];
    if (type === 'Type1') {
      cells = selected.filter(c => c.type1)
    } else if (type === 'Type2') {
      cells = selected.filter(c => c.type2)
    } else if (type === 'Type3') {
      cells = selected.filter(c => c.type3)
    }
    return cells.length;
  }

  return (
    <div className={styles.tableType1}>
      {(type === 'Type1' && getCellsCount('Type1') > 0) && (
        <div className={styles.cellsResetWrapper}>
          <button
            onClick={resetCellsHandler}
            className={`${styles.cellsResetButton} ${getTypeClass(type)}`}
          >
            <ResetIcon />
          </button>
        </div>
      )}
      {(type === 'Type2' && getCellsCount('Type2') > 0) && (
        <div className={styles.cellsResetWrapper}>
          <button
            onClick={resetCellsHandler}
            className={`${styles.cellsResetButton} ${getTypeClass(type)}`}
          >
            <ResetIcon />
          </button>
        </div>
      )}
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
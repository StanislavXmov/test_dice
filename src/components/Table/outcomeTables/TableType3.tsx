import { Key } from 'react';
import { TwoConditionCell, Type, useOutcomeTable } from '../../../state/useTable';
import { findedAllX, findedAllY } from './TableType1';

import styles from '../OutcomeTable.module.scss';

import Dice3_1 from '../../icons/dice12_1.svg?react';
import Dice3_2 from '../../icons/dice12_2.svg?react';
import Dice3_3 from '../../icons/dice12_3.svg?react';
import Dice3_4 from '../../icons/dice12_4.svg?react';
import Dice3_5 from '../../icons/dice12_5.svg?react';
import Dice3_6 from '../../icons/dice12_6.svg?react';
import Dice3_7 from '../../icons/dice12_7.svg?react';
import Dice3_8 from '../../icons/dice12_8.svg?react';
import Dice3_9 from '../../icons/dice12_9.svg?react';
import Dice3_10 from '../../icons/dice12_10.svg?react';
import Dice3_11 from '../../icons/dice12_11.svg?react';
import Dice3_12 from '../../icons/dice12_12.svg?react';

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

type ViewTable = 'values' | 'sum';

type Type3Edge = 1|2|3|4|5|6|7|8|9|10|11|12;
const type3Array: Type3Edge[] = [1,2,3,4,5,6,7,8,9,10,11,12];
const cells3Array = new Array(type3Array.length * type3Array.length).fill(null).map<TwoConditionCell>((_, i) => {
  let x = (i + 1) % 12;
  if (x === 0) {
    x = 12;
  }
  const y = Math.floor(i / 12) + 1;
  
  return ({
    id: i,
    x: x,
    y: y,
    type1: false,
    type2: false,
    type3: false,
  });
});

export const TableType3 = ({ tableView }: {tableView: ViewTable}) => {
  const selected = useOutcomeTable(s => s.selected);
  const type = useOutcomeTable(s => s.cellType);
  const add = useOutcomeTable(s => s.add);
  const addMore = useOutcomeTable(s => s.addMore);
  const removeIds = useOutcomeTable(s => s.removeIds);

  const horizontalLabelHandler = (k: Type3Edge, idx: number) => {
    if (findedAllY(selected, idx, 12,type)) {
      const ids: number[] = [];
      for (let i = 0; i < type3Array.length; i++) {
        const id = (i * 12) + idx;
        if (type === 'Type1') {
          const findes = selected.find(f => f.id === id);
          if (!findes.type2) {
            ids.push(id);
            const f = cells3Array.find(f => f.id === id);
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
            const f = cells3Array.find(f => f.id === id);
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
    for (let i = 0; i < type3Array.length; i++) {
      const id = (i * 12) + idx;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        const c = cells3Array.find(f => f.id === id);
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

  const verticalLabelHandler = (k: Type3Edge, idx: number) => {
    if (findedAllX(selected, idx, 12, type)) {
      const ids: number[] = [];
      for (let i = 0; i < type3Array.length; i++) {
        const id = (idx * 12) + i;
        if (type === 'Type1') {
          const findes = selected.find(f => f.id === id);
          if (!findes.type2) {
            ids.push(id);
            const f = cells3Array.find(f => f.id === id);
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
            const f = cells3Array.find(f => f.id === id);
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
    
    for (let i = 0; i < type3Array.length; i++) {
      const id = (idx * 12) + i;
      const finded = selected.find(f => f.id === id);
      if (!finded) {
        const c = cells3Array.find(f => f.id === id);
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
          className={`${styles.cellType3} ${includes(c) ? getType(c, type) : ''}`}
          onClick={() => add(c)}
        >
          {tableView === 'values' ? `${c.y};${c.x}` : `${c.y + c.x}`}
        </div>
        ))}
      </div>
    </div>
  );
}
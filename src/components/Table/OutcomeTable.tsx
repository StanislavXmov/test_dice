import { ChangeEvent, useState } from 'react'
import { Edge, TwoConditionCell, Type, useOutcomeTable } from '../../state/useTable';
import { TableType1 } from './outcomeTables/TableType1';
import { TableType2 } from './outcomeTables/TableType2';
import { TableType3 } from './outcomeTables/TableType3';

import styles from './OutcomeTable.module.scss';

import ResetIcon from '../icons/reset2.svg?react';

interface ButtonProps {
  cb: () => void;
}

type ViewTable = 'values' | 'sum';

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

type Type2Edge = 1|2|3|4|5|6|7|8;
const type2Array: Type2Edge[] = [1,2,3,4,5,6,7,8];
const cells2Array = new Array(type2Array.length * type2Array.length).fill(null).map<TwoConditionCell>((_, i) => {
  let x = (i + 1) % 8;
  if (x === 0) {
    x = 8;
  }
  const y = Math.floor(i / 8) + 1;
  
  return ({
    id: i,
    x: x,
    y: y,
    type1: false,
    type2: false,
    type3: false,
  });
});

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

const Table = ({tableView}: {tableView: ViewTable}) => {
  const type = useOutcomeTable(s => s.type);

  return (
    <>
      <div className={styles.wrapper}>
        {type === 6 && <TableType1 tableView={tableView} cells1Array={cells1Array} />}
        {type === 8 && <TableType2 tableView={tableView} cells2Array={cells2Array} />}
        {type === 12 && <TableType3 tableView={tableView} cells3Array={cells3Array} />}
      </div>
    </>
  );
}

const EventControll = () => {
  const activeType = useOutcomeTable(s => s.cellType);
  const setCellType = useOutcomeTable(s => s.setCellType);

  const setActiveTypeHandler = (type: Type) => {
    setCellType(type);
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

const toCaseCount = (arg: number) => {
  let titles = ['ячейка', 'ячейки', 'ячеек'];
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(arg % 100 > 4 && arg % 100 < 20) ? 2 : cases[Math.min(arg % 10, 5)]];
}

export const OutcomeTable = () => {
  const [tableView, setTableView] = useState<ViewTable>('values');
  const setType = useOutcomeTable(s => s.setType);
  const setCellType = useOutcomeTable(s => s.setCellType);
  const selected = useOutcomeTable(s => s.selected);
  const clear = useOutcomeTable(s => s.clear);

  const resetHandler = () => {
    clear();
    cells1Array.forEach(c => {
      c.type1 = false;
      c.type2 = false;
      c.type3 = false;
    });
    cells2Array.forEach(c => {
      c.type1 = false;
      c.type2 = false;
      c.type3 = false;
    });
    cells3Array.forEach(c => {
      c.type1 = false;
      c.type2 = false;
      c.type3 = false;
    });
    setCellType('Type1');
  }

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(Number(e.target.value) as Edge);
    clear();
  }

  const selectTableViewHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setTableView(e.target.value as ViewTable);
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
    return `${cells.length} ${toCaseCount(cells.length)}`;
  }

  return (
    <div className={styles.layer}>
      <ResetButton cb={resetHandler} />
      <div className={styles.headerWrapper}>
        <h2 className={styles.title}>Таблица исходов</h2>
        <div>
          <select
            id='selectType'
            className={styles.selectType}
            onChange={selectHandler}
          >
            <option value={6}>для 6-гранного кубика</option>
            <option value={8}>для 8-гранного кубика</option>
            <option value={12}>для 12-гранного кубика</option>
          </select>
        </div>
        <div>
        <select
          id='tableView1'
          className={styles.select}
          onChange={selectTableViewHandler}
        >
          <option value={'values'}>со значениями</option>
          <option value={'sum'}>с суммами</option>
        </select>
        </div>
      </div>
      <EventControll />
      <div className={styles.tableWrapper}>
        <Table tableView={tableView} />
      </div>
      <div  className={styles.infoWrapper}>
        <span className={styles.labelTitle}>Выбрано</span>
        <div className={styles.eventType1Info}>
          <span className={styles.infoText}>событие А — </span><span className={styles.infoText}>{getCellsCount('Type1')}</span>
        </div>
        <div className={styles.eventType2Info}>
          <span className={styles.infoText}>событие Б — </span><span className={styles.infoText}>{getCellsCount('Type2')}</span>
        </div>
        <div className={styles.eventType3Info}>
          <span className={styles.infoText}>A ∩ B — </span><span className={styles.infoText}>{getCellsCount('Type3')}</span>
        </div>
      </div>
    </div>
  )
}

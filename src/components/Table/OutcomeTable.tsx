import { ChangeEvent, useState } from 'react'
import { Edge, Type, useOutcomeTable } from '../../state/useTable';

import styles from './OutcomeTable.module.scss';

import ResetIcon from '../icons/reset2.svg?react';

interface ButtonProps {
  cb: () => void;
}

type ViewTable = 'values' | 'sum';

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

const EventControll = () => {
  const [activeType, setActiveType] = useState<Type>('Type1');
  const setCellType = useOutcomeTable(s => s.setCellType);

  const setActiveTypeHandler = (type: Type) => {
    setActiveType(type);
    setCellType(type);
  }

  return (
    <div className={styles.eventControllWrapper}>
      <button
        onClick={() => setActiveTypeHandler('Type1')}
        className={`${styles.eventButtonType1} ${activeType === 'Type1' ? styles.eventButtonType1Active : ''}`}
      >
        Событие А
      </button>
      <button
        onClick={() => setActiveTypeHandler('Type2')}
        className={`${styles.eventButtonType2} ${activeType === 'Type2' ? styles.eventButtonType2Active : ''}`}
      >
        Событие Б
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

export const OutcomeTable = () => {
  const [tableView, setTableView] = useState<ViewTable>('values');
  const setType = useOutcomeTable(s => s.setType);
  const clear = useOutcomeTable(s => s.clear);

  const resetHandler = () => {
    clear();
  }

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(Number(e.target.value) as Edge);
    clear();
  }

  const selectTableViewHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setTableView(e.target.value as ViewTable);
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
    </div>
  )
}

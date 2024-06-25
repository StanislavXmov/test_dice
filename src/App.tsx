import { CoinLayer1 } from './components/Coins/Layers/CoinLayer1';
import { DiceLayer1 } from './components/Dices/Layers/DiceLayer1';
import { TableLayer } from './components/Table/TableLayer';
import { CoinSeries } from './components/Coins/Series/Series';
import { DiceSeries } from './components/Dices/Series/Series';
import { TableLayerType2 } from './components/Table/TableLayerType2';
import { CoinLayerAnimated } from './components/Coins/Layers/CoinLayerAnimated';
import { DiceLayerAnimated } from './components/Dices/Layers/DiceLayerAnimated';
import { OneConditionTable } from './components/Table/OneConditionTable';
import { TwoConditionTable } from './components/Table/TwoConditionTable';
import { OutcomeTable } from './components/Table/OutcomeTable';
import { SolutionTable } from './components/Table/SolutionTable';

import styles from './App.module.scss';
import { CardLayout1 } from './components/Cards/CardLayout1';

function App() {  
  return (
    // <CoinLayer1 />
    <>
      {/* <div className={styles.testWrapper}>
        <CoinLayer1 />
        <DiceLayer1 />
      </div> */}
      {/* <div className={styles.testWrapper}>
        <CoinLayerAnimated />
        <DiceLayerAnimated />
      </div> */}
      {/* <div className={styles.testWrapper}>
        <DiceSeries />
        <CoinSeries />
      </div> */}
      <div className={styles.testWrapper}>
        <CardLayout1 />
        <SolutionTable />
        <OutcomeTable />
        <TwoConditionTable />
        <OneConditionTable />
        {/* <TableLayer /> */}
        {/* <TableLayerType2 /> */}
      </div>
    </>
  );
}

export default App;

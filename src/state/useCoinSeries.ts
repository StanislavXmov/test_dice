import random from "random";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Coin = 'OREL' | '5';

interface CoinSeriesState {
  series: Coin[][];
  setSeries: (v: Coin[][]) => void;
  length: number;
  setLength: (v: number) => void;
  seriesN: number;
  setSeriesN: (v: number) => void;
  event: Coin;
  setEvent: (v: Coin) => void;
  k: number;
  setK: (v: number) => void;
}

const getCoinSeries = (seriesN: number, length: number) => {
  const seriesList: Coin[][] = [];
  for (let i = 0; i < seriesN; i++) {
    const list: Coin[] = [];
    for (let j = 0; j < length; j++) {
      const n = random.int(0, 1);
      if (n === 1) {
        list.push('OREL');
      } else {
        list.push('5');
      }
    }
    seriesList.push(list);
  }
  
  return seriesList;
}



export const useCoinSeries = create<CoinSeriesState>()(subscribeWithSelector(set => ({
  series: getCoinSeries(50, 5),
  // setSeries: (v) => set((s) => ({series: [...s.series, ...v]})),
  setSeries: (v) => set((s) => ({series: [...v]})),
  length: 5,
  setLength: (v) => set(() => ({length: v})),
  seriesN: 2,
  setSeriesN: (v) => set(() => ({seriesN: v})),
  event: "5",
  setEvent: (v) => set(() => ({event: v})),
  k: 0,
  setK: (v) => set(() => ({k: v})),
})));
import random from "random";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";


export type Edge = 6 | 8 | 12;

export type EventDice = '=' | '>' | '<';

interface DiceSeriesState {
  edge: Edge;
  setEdge: (v: Edge) => void;
  series: number[][];
  setSeries: (v: number[][]) => void;
  length: number;
  setLength: (v: number) => void;
  seriesN: number;
  setSeriesN: (v: number) => void;
  event: EventDice;
  setEvent: (v: EventDice) => void;
  k: number;
  setK: (v: number) => void;
  point: number;
  setPoint: (v: number) => void;
  calcSeries: () => void;
}

const getDiceSeries = (seriesN: number, length: number) => {
  const series: {'6': number[][], '8': number[][], '12': number[][]} = {
    "6": [],
    "8": [],
    "12": [],
  }
  const seriesList6: number[][] = [];
  const seriesList8: number[][] = [];
  const seriesList12: number[][] = [];
  for (let i = 0; i < seriesN; i++) {
    const list6: number[] = [];
    const list8: number[] = [];
    const list12: number[] = [];
    for (let j = 0; j < length; j++) {
      const n6 = random.int(1, 6);
      list6.push(n6);
      const n8 = random.int(1, 8);
      list8.push(n8);
      const n12 = random.int(1, 12);
      list12.push(n12);
    }
    seriesList6.push(list6);
    seriesList8.push(list8);
    seriesList12.push(list12);
  }

  series['6'] = seriesList6;
  series['8'] = seriesList8;
  series['12'] = seriesList12;

  return series['6'];
}

const maxSeriesN = 500;
const maxLength = 20;

export const useDiceSeries = create<DiceSeriesState>()(subscribeWithSelector(set => ({
  edge: 6,
  setEdge: (v) => set(() => ({edge: v})),
  series: [],
  // setSeries: (v) => set((s) => ({series: [...s.series, ...v]})),
  setSeries: (v) => set((s) => ({series: [...v]})),
  length: 5,
  setLength: (v) => set(() => ({length: v})),
  seriesN: 2,
  setSeriesN: (v) => set(() => ({seriesN: v})),
  event: "=",
  setEvent: (v) => set(() => ({event: v})),
  k: 0,
  setK: (v) => set(() => ({k: v})),
  point: 1,
  setPoint: (v) => set(() => ({point: v})),
  calcSeries: () => set((s) => {
    const series = getDiceSeries(maxSeriesN, maxLength);
    return {series};
  }),
})));
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
}

const getDiceSeries = (seriesN: number, length: number, edge: Edge) => {
  const seriesList: number[][] = [];
  for (let i = 0; i < seriesN; i++) {
    const list: number[] = [];
    for (let j = 0; j < length; j++) {
      if (edge === 6) {
        const n = random.int(1, 6);
        list.push(n);
      } else if (edge === 8) {
        const n = random.int(1, 8);
        list.push(n);
      } else if (edge === 12) {
        const n = random.int(1, 12);
        list.push(n);
      }
    }
    seriesList.push(list);
  }

  return seriesList;
}

export const useDiceSeries = create<DiceSeriesState>()(subscribeWithSelector(set => ({
  edge: 6,
  setEdge: (v) => set(() => ({edge: v})),
  series: getDiceSeries(30, 20, 6),
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
})));
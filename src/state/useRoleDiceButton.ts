import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface RoleDiceButtonState {
  disabled: boolean;
  setDisabled: (v: boolean) => void;
}

export const useRoleDiceButton = create<RoleDiceButtonState>()(subscribeWithSelector(set => ({
  disabled: false,
  setDisabled: (v) => set((() => ({disabled: v}))),
})));

export const useRoleDiceSeriesButton = create<RoleDiceButtonState>()(subscribeWithSelector(set => ({
  disabled: false,
  setDisabled: (v) => set((() => ({disabled: v}))),
})));
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface RoleCoinButtonState {
  disabled: boolean;
  setDisabled: (v: boolean) => void;
}

export const useRoleCoinButton = create<RoleCoinButtonState>()(subscribeWithSelector(set => ({
  disabled: false,
  setDisabled: (v) => set((() => ({disabled: v}))),
})));
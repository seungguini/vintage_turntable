import { create } from "zustand";
/**
 * Zustand store containing states regarding animation ques,
 * such as toneArmFinished
 */
interface AnimationType {
  toneArmFinished: boolean;
  actions: AnimationActions
}

interface AnimationActions {
    setToneArmFinished: (to: boolean) => void
}

const useAnimationStore = create<AnimationType>((set, get) => ({
  toneArmFinished: false,
  actions: {
    setToneArmFinished: (to: boolean) => set({toneArmFinished: to})
  }
}));

export const useToneArmFinished = () : boolean => useAnimationStore((state) => state.toneArmFinished)
export const useAnimationActions = (): AnimationActions => useAnimationStore((state) => state.actions)
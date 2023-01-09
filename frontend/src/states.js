import create from "zustand";

// Store to manage song playback data
// - playing song, song list, album info, etc.
const usePlaybackStore = create((set, get) => ({
  isPlaying: false,
  volume: 100,
  actions: {
    // Separating actions from state : https://tkdodo.eu/blog/working-with-zustand#separate-actions-from-state
    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    mute: () => set({ volume: 0 }),
    unmute: () => set({ volume: 100 }),
    setVolume: (to) => set({ volume: to }),
    soundIsOn: () => {
      return get().volume !== 0;
    },
  },
}));

// Custom hooks
// helps prevent user from subscribing to the entire store
// reference : https://tkdodo.eu/blog/working-with-zustand#only-export-custom-hooks
export const useIsPlaying = () => usePlaybackStore((state) => state.isPlaying);
export const useVolume = () => usePlaybackStore((state) => state.volume);
export const usePlaybackActions = () =>
  usePlaybackStore((state) => state.actions);

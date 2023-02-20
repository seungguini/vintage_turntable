import create from "zustand";

type PlayBackStoreType = {
  isPlaying: Boolean;
  volume: Number;
  actions: {
    play: () => void;
    pause: () => void;
    mute: () => void;
    unmute: () => void;
    setVolume: (to: Number) => void;
    isMute: () => Boolean;
  };
};

// Store to manage song playback data
// - playing song, song list, album info, etc.
const usePlaybackStore = create<PlayBackStoreType>((set, get) => ({
  isPlaying: false,
  volume: 1,
  actions: {
    // Separating actions from state : https://tkdodo.eu/blog/working-with-zustand#separate-actions-from-state
    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    mute: () => {
      set({ volume: 0})}, 
    unmute: () => {
      set({ volume: 1 })},
    setVolume: (to) => set({ volume: to }),
    isMute: () => {
      return get().volume == 0;
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

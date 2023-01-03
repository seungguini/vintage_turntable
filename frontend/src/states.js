import create from "zustand";

// Store to manage song playback data
// - playing song, song list, album info, etc.
const usePlaybackStore = create((set) => ({
  isPlaying: false,
  volume: 100,
  setPlaying: (input) => set((state) => ({ isPlaying: input })), // Typing would be very helpful
  setVolume: (input) => set((state) => ({ volume: input })),
}));

export { usePlaybackStore };

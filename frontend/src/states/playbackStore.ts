import { create } from "zustand";
import { AudioType } from "../utils/constants";
import SONG_DATA from "../utils/songData";

interface SongData {
  name: string,
  cover: string,
  artist: string,
  color: string[],
  id: string,
  active: boolean
}

interface PlaybackStoreType {
  audio: AudioType; // The song loaded onto the Turntable
  songs: SongData[]
  songIdx: number
  isPlaying: boolean;
  volume: number;
  actions: PlaybackActions;
};

interface PlaybackActions {
  play: () => void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  setVolume: (to: number) => void; 
  isMute: () => boolean;
}

const setNextSongIdx = (set, get) => {
  const currIdx = get().songIdx
  const numSongs = get().songs.length
  if (currIdx == numSongs - 1) {
    set({songIdx: 0})
  } else {
    set({songIdx: currIdx + 1})
  }
}

const setPrevSongIdx = (set, get) => {
  const currIdx = get().songIdx
  const numSongs = get().songs.length
  if (currIdx == 0) {
    set({songIdx: numSongs - 1})
  } else {
    set({songIdx: currIdx - 1})
  }
}

const usePlaybackStore = create<PlaybackStoreType>((set, get) => ({
  audio: new Audio("/songs/Daylight.mp3"),
  songs: SONG_DATA,
  songIdx: 0,
  isPlaying: false,
  volume: 1,
  actions: {
    // Separating actions from state : https://tkdodo.eu/blog/working-with-zustand#separate-actions-from-state
    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    nextSong: () => setNextSongIdx(set, get), 
    prevSong: () => setPrevSongIdx(set, get), 
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
export const useAudio = () : AudioType => usePlaybackStore((state) => state.audio);
export const useIsPlaying = (): boolean => usePlaybackStore((state) => state.isPlaying);
export const useVolume = (): number => usePlaybackStore((state) => state.volume);
export const usePlaybackActions = (): PlaybackActions =>
  usePlaybackStore((state) => state.actions);

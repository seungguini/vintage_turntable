import { create } from "zustand";
import { AudioType } from "../utils/constants";
import SONG_DATA from "../utils/songData";

interface LocalSongData {
  name: string,
  cover: string,
  artist: string,
  color: string[],
  id: string,
  active: boolean
}

interface PlaybackStoreType {
  audio: AudioType; // The song loaded onto the Turntable
  songs: LocalSongData[],
  songIdx: number
  isPlaying: boolean;
  volume: number;
  actions: PlaybackActions;
};

interface PlaybackActions {
  play: () => void;
  pause: () => void;
  nextSong: () => void;
  prevSong: () => void
  mute: () => void;
  unmute: () => void;
  setVolume: (to: number) => void; 
  isMute: () => boolean;
}

const getNextSongIdx = (songIdx: number, numSongs: number): { songIdx: number } => {
  if (songIdx == numSongs - 1) {
    return { songIdx: 0 }
  } else {
    return { songIdx: songIdx + 1}
  }
}

const getPrevSongIdx = (songIdx: number, numSongs: number): { songIdx: number } => {
  if (songIdx == 0) {
    return { songIdx: numSongs - 1 }
  } else {
    return { songIdx: songIdx - 1}
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
    nextSong: () => {
      const songIdx: number = get().songIdx
      const numSongs: number = get().songs.length
      set(getNextSongIdx(songIdx, numSongs))
    },
    prevSong: () => {
      const songIdx: number = get().songIdx
      const numSongs: number = get().songs.length
      set(getPrevSongIdx(songIdx, numSongs))
    },
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

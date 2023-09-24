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

type UpdateType = "next" | "prev"

// Calculates the updated song index, depending on whether the user selected next or previous
const updateSongIdx = (to: UpdateType, currIdx: number, numSongs: number): number => {
  switch (to) {
    case "next":
      if (currIdx == numSongs - 1) {
        return 0
      } else {
        return currIdx + 1
      }
    case "prev":
      if (currIdx == 0) {
        return numSongs - 1
      } else {
        return currIdx - 1
      }
  }
}

const initializeNewAudio = (songIdx: number, songs: LocalSongData[]): AudioType => {
  const songData: LocalSongData = songs[songIdx]
  return new Audio(process.env.PUBLIC_URL + "/songs/" + songData["name"] + ".mp3")
}

const updateSong = (newSongIdx: number, songs: LocalSongData[]): { audio: AudioType, songIdx: number } => {
  const newAudio: AudioType = initializeNewAudio(newSongIdx, songs)
  return { songIdx : newSongIdx, audio: newAudio }
}

// const nextSongAction = (set: (partial: PlaybackStoreType) => void, get: () => PlaybackStoreType) => {

// }

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
      get().audio.pause()
      const currIdx: number = get().songIdx
      const songs: LocalSongData[] = get().songs
      const newSongIdx = updateSongIdx("next", currIdx, songs.length)
      set(updateSong(newSongIdx, songs)) // Update the song itself too to keep song update logic encapsultaed
    },
    prevSong: () => {
      get().audio.pause()
      const currIdx: number = get().songIdx
      const songs: LocalSongData[] = get().songs
      const newSongIdx = updateSongIdx("prev", currIdx, songs.length)
      set(updateSong(newSongIdx, songs))
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
export const useSongIdx = (): number => usePlaybackStore((state) => state.songIdx)
export const usePlaybackActions = (): PlaybackActions =>
  usePlaybackStore((state) => state.actions);

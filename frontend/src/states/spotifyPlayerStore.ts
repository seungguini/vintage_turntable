import { create } from "zustand";

interface SpotifyPlayerActions {
  setPlayer: (player : Spotify.Player) => void
}

interface SpotifyPlayerType {
  player: Spotify.Player | null,
  isCurrentDeviceActive: boolean,
  actions: SpotifyPlayerActions
}

const useSpotifyPlayerStore = 
create<SpotifyPlayerType>((set) => ({
  player: null,
  isCurrentDeviceActive: false,
  actions: {
    setPlayer: (player : Spotify.Player) => set({player: player})
  }
}));

export const useSpotifyActions = () : SpotifyPlayerActions =>
  useSpotifyPlayerStore((state) => state.actions);
export const useSpotifyPlayer = () : Spotify.Player | null => 
  useSpotifyPlayerStore((state) => state.player);

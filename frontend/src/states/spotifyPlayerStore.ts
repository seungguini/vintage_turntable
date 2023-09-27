import { create } from "zustand";

interface SpotifyPlayerActions {
  setPlayer: (player : Spotify.Player) => void,
  setIsCurrentDeviceActive: (active : boolean) => void
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
    setPlayer: (player : Spotify.Player) => set({player: player}),
    setIsCurrentDeviceActive: (active : boolean) => set({isCurrentDeviceActive: active})
  }
}));

export const useSpotifyActions = () : SpotifyPlayerActions =>
  useSpotifyPlayerStore((state) => state.actions);
export const useSpotifyPlayer = () : Spotify.Player | null => 
  useSpotifyPlayerStore((state) => state.player);
export const useSpotifyIsCurrentDeviceActive = () : boolean => 
  useSpotifyPlayerStore((state) => state.isCurrentDeviceActive)

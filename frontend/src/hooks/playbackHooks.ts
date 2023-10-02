import { useEffect } from 'react'
import { useIsPlaying, useVolume, useSong } from '../states/playbackStore';
import { useToneArmFinished } from '../states/animationStore';
import { useSpotifyPlayer } from '../states/spotifyPlayerStore';
import { AudioType, TONE_ARM_SOUND_EFFECT, VINYL_SOUND_EFFECT, SS_ACCESS_TOKEN_KEY, SS_DEVICE_ID_KEY } from '../utils/constants';
import { transferPlayback } from '../utils/spotifyClient';
// Custom hook which encapsulates playback logic
const usePlayback = (): void => {

    const isPlaying: boolean = useIsPlaying()
    const song: AudioType = useSong()
    const toneArmFinished: boolean = useToneArmFinished()
    const spotifyPlayer : Spotify.Player | null = useSpotifyPlayer();

  const playSpotify = () => {

    const token : string | null = localStorage.getItem(SS_ACCESS_TOKEN_KEY);
    const deviceId : string | null = sessionStorage.getItem(SS_DEVICE_ID_KEY);
    const playOnTransfer : boolean = true;

    if(token && deviceId) {
      console.log("Transfer playback")
      transferPlayback(token, deviceId, playOnTransfer);
    }
  };

  const pauseSpotify = (spotifyPlayer : Spotify.Player) => {
    spotifyPlayer.pause();
  }

  //  Pause song
  useEffect(() => {
    if (!isPlaying) {
      if(spotifyPlayer) {
        pauseSpotify(spotifyPlayer);
      } else {
        song.pause();
      }

      TONE_ARM_SOUND_EFFECT.play();
      VINYL_SOUND_EFFECT.pause();
    }
  }, [isPlaying]);

  // Song plays only when the tone arm moves onto the record
  useEffect(() => {
    if (isPlaying && toneArmFinished) {

      console.log("Play button hit + tone arm moved");
      TONE_ARM_SOUND_EFFECT.play();
      VINYL_SOUND_EFFECT.play();

      if(spotifyPlayer) {
        playSpotify();
      } else {
        song.play();
      }
    }
  }, [toneArmFinished]);

}

const useVolumeControls = (): void => {
  const song: AudioType = useSong()
  const volume: number = useVolume()

  // Initialize song volume
  song.volume = 0.1;

  useEffect(() => {
    TONE_ARM_SOUND_EFFECT.volume = volume;
    song.volume = volume;
  }, [volume]);
}

const useInitializePlayback = () => {
  usePlayback()
  useVolumeControls()
}

export { useInitializePlayback }
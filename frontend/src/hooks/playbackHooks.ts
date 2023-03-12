import { useEffect } from 'react'
import { useIsPlaying, useVolume, useAudio } from '../states/playbackStore';
import { useToneArmFinished } from '../states/animationStore';
import { AudioType, TONE_ARM_SOUND_EFFECT, VINYL_SOUND_EFFECT } from '../utils/constants';
// Custom hook which encapsulates playback logic
const usePlayback = (): void => {

    const isPlaying: boolean = useIsPlaying()
    const audio: AudioType = useAudio()
    const toneArmFinished: boolean = useToneArmFinished()

  //  Pause audio
  useEffect(() => {
    if (!isPlaying) {
      audio.pause();
      TONE_ARM_SOUND_EFFECT.play();
      VINYL_SOUND_EFFECT.pause();
    }
  }, [isPlaying]);

  // audio plays only when the tone arm moves onto the record
  useEffect(() => {
    if (isPlaying && toneArmFinished) {
      console.log("Play button hit + tone arm moved");
      TONE_ARM_SOUND_EFFECT.play();
      VINYL_SOUND_EFFECT.play();
      audio.play();
    }
  }, [toneArmFinished]);

}

const useVolumeControls = (): void => {
  const audio: AudioType = useAudio()
  const volume: number = useVolume()

  // Initialize audio volume
  audio.volume = 0.1;

  useEffect(() => {
    TONE_ARM_SOUND_EFFECT.volume = volume;
    audio.volume = volume;
  }, [volume]);
}

const useInitializePlayback = () => {
  usePlayback()
  useVolumeControls()
}

export { useInitializePlayback }
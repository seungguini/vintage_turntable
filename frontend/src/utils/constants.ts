
type AudioType = HTMLAudioElement

const TONE_ARM_SOUND_EFFECT: AudioType = new Audio("/soundeffects/tonearm_on_sound.mp3");
TONE_ARM_SOUND_EFFECT.volume = 0.4;
const VINYL_SOUND_EFFECT: AudioType = new Audio("/soundeffects/vinyl_soundeffect.mp3");
VINYL_SOUND_EFFECT.volume = 1;
VINYL_SOUND_EFFECT.loop = true;

const BACKEND_DEV_URL = "http://localhost:8000/";
const SS_ACCESS_TOKEN_KEY = "spotify_access_token";
const SS_REFRESH_TOKEN_KEY = "spotify_refresh_token";
const SS_DEVICE_ID_KEY = "spotify_device_id";

export {
  TONE_ARM_SOUND_EFFECT,
  VINYL_SOUND_EFFECT,
  BACKEND_DEV_URL,
  SS_ACCESS_TOKEN_KEY,
  SS_REFRESH_TOKEN_KEY,
  SS_DEVICE_ID_KEY
}
export type { AudioType }

type AudioType = HTMLAudioElement

const TONE_ARM_SOUND_EFFECT: AudioType = new Audio("/soundeffects/tonearm_on_sound.mp3");
TONE_ARM_SOUND_EFFECT.volume = 0.4;
const VINYL_SOUND_EFFECT: AudioType = new Audio("/soundeffects/vinyl_soundeffect.mp3");
VINYL_SOUND_EFFECT.volume = 1;
VINYL_SOUND_EFFECT.loop = true;

export {TONE_ARM_SOUND_EFFECT, VINYL_SOUND_EFFECT}
export type { AudioType }
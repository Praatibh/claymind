/**
 * Haptic Feedback & Sound Effects System
 * Provides tactile and audio feedback for UI interactions
 */

// ==================== HAPTIC FEEDBACK ====================

export type HapticPattern = "light" | "medium" | "heavy" | "success" | "warning" | "error";

/**
 * Trigger haptic feedback on supported devices
 */
export const triggerHaptic = (pattern: HapticPattern = "light") => {
  // Check if the browser supports the Vibration API
  if (!("vibrate" in navigator)) return;

  const patterns: Record<HapticPattern, number | number[]> = {
    light: 10,
    medium: 20,
    heavy: 30,
    success: [10, 50, 10],
    warning: [20, 30, 20],
    error: [30, 100, 30, 100, 30],
  };

  try {
    navigator.vibrate(patterns[pattern]);
  } catch (e) {
    // Silently fail if vibration is not supported
    console.debug("Haptic feedback not supported");
  }
};

// ==================== SOUND EFFECTS ====================

export type SoundEffect =
  | "click"
  | "hover"
  | "success"
  | "levelUp"
  | "badgeEarned"
  | "xpGain"
  | "error"
  | "swoosh"
  | "pop"
  | "sparkle"
  | "coin"
  | "unlock";

/**
 * Sound Effects Manager
 * Handles loading, caching, and playing sound effects
 */
class SoundManager {
  private sounds: Map<SoundEffect, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.5;

  constructor() {
    // Load sounds on initialization
    this.initSounds();
  }

  private initSounds() {
    // Define sound effects (using Web Audio API synthesized sounds as fallback)
    const soundDefinitions: Record<SoundEffect, string> = {
      click: this.generateClickSound(),
      hover: this.generateHoverSound(),
      success: this.generateSuccessSound(),
      levelUp: this.generateLevelUpSound(),
      badgeEarned: this.generateBadgeSound(),
      xpGain: this.generateXpSound(),
      error: this.generateErrorSound(),
      swoosh: this.generateSwooshSound(),
      pop: this.generatePopSound(),
      sparkle: this.generateSparkleSound(),
      coin: this.generateCoinSound(),
      unlock: this.generateUnlockSound(),
    };

    // Create audio elements for each sound
    Object.entries(soundDefinitions).forEach(([key, dataUrl]) => {
      const audio = new Audio(dataUrl);
      audio.volume = this.volume;
      this.sounds.set(key as SoundEffect, audio);
    });
  }

  // Generate synthesized sound effects using Web Audio API
  private generateClickSound(): string {
    return this.synthesizeSound({
      frequency: 800,
      duration: 0.05,
      type: "sine",
      attack: 0.01,
      release: 0.04,
    });
  }

  private generateHoverSound(): string {
    return this.synthesizeSound({
      frequency: 600,
      duration: 0.03,
      type: "sine",
      attack: 0.005,
      release: 0.025,
      volume: 0.3,
    });
  }

  private generateSuccessSound(): string {
    return this.synthesizeSound({
      frequency: [523, 659, 784], // C-E-G major chord
      duration: 0.3,
      type: "sine",
      attack: 0.01,
      release: 0.2,
    });
  }

  private generateLevelUpSound(): string {
    return this.synthesizeSound({
      frequency: [523, 659, 784, 1047], // C-E-G-C progression
      duration: 0.5,
      type: "triangle",
      attack: 0.02,
      release: 0.3,
    });
  }

  private generateBadgeSound(): string {
    return this.synthesizeSound({
      frequency: [1047, 1319, 1568], // High sparkle sound
      duration: 0.4,
      type: "sine",
      attack: 0.01,
      release: 0.25,
    });
  }

  private generateXpSound(): string {
    return this.synthesizeSound({
      frequency: [700, 900],
      duration: 0.15,
      type: "sine",
      attack: 0.01,
      release: 0.1,
    });
  }

  private generateErrorSound(): string {
    return this.synthesizeSound({
      frequency: 200,
      duration: 0.2,
      type: "sawtooth",
      attack: 0.01,
      release: 0.15,
    });
  }

  private generateSwooshSound(): string {
    return this.synthesizeSound({
      frequency: [300, 100], // Descending swoosh
      duration: 0.2,
      type: "sawtooth",
      attack: 0.01,
      release: 0.15,
    });
  }

  private generatePopSound(): string {
    return this.synthesizeSound({
      frequency: 400,
      duration: 0.08,
      type: "sine",
      attack: 0.01,
      release: 0.07,
    });
  }

  private generateSparkleSound(): string {
    return this.synthesizeSound({
      frequency: [2000, 2500, 3000],
      duration: 0.15,
      type: "sine",
      attack: 0.005,
      release: 0.1,
      volume: 0.4,
    });
  }

  private generateCoinSound(): string {
    return this.synthesizeSound({
      frequency: [880, 1109], // A-C# interval
      duration: 0.2,
      type: "triangle",
      attack: 0.01,
      release: 0.15,
    });
  }

  private generateUnlockSound(): string {
    return this.synthesizeSound({
      frequency: [523, 784, 1047, 1319], // Ascending progression
      duration: 0.6,
      type: "sine",
      attack: 0.02,
      release: 0.4,
    });
  }

  /**
   * Synthesize sound using Web Audio API
   */
  private synthesizeSound(config: {
    frequency: number | number[];
    duration: number;
    type: OscillatorType;
    attack: number;
    release: number;
    volume?: number;
  }): string {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const sampleRate = audioContext.sampleRate;
    const length = config.duration * sampleRate;
    const buffer = audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    const frequencies = Array.isArray(config.frequency) ? config.frequency : [config.frequency];
    const volume = config.volume ?? 0.5;

    for (let i = 0; i < length; i++) {
      const time = i / sampleRate;
      let sample = 0;

      // Generate tone for each frequency
      frequencies.forEach((freq, index) => {
        const t = time - (index * config.duration) / frequencies.length;
        if (t >= 0) {
          let value = 0;
          switch (config.type) {
            case "sine":
              value = Math.sin(2 * Math.PI * freq * t);
              break;
            case "triangle":
              value = (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * freq * t));
              break;
            case "sawtooth":
              value = 2 * ((t * freq) % 1) - 1;
              break;
          }

          // Apply envelope (attack-release)
          let envelope = 1;
          if (t < config.attack) {
            envelope = t / config.attack;
          } else if (t > config.duration - config.release) {
            envelope = (config.duration - t) / config.release;
          }

          sample += value * envelope * volume;
        }
      });

      data[i] = sample / frequencies.length;
    }

    // Convert to WAV and return data URL
    const wavData = this.bufferToWave(buffer);
    return URL.createObjectURL(new Blob([wavData], { type: "audio/wav" }));
  }

  /**
   * Convert AudioBuffer to WAV format
   */
  private bufferToWave(buffer: AudioBuffer): ArrayBuffer {
    const length = buffer.length * buffer.numberOfChannels * 2 + 44;
    const arrayBuffer = new ArrayBuffer(length);
    const view = new DataView(arrayBuffer);
    const channels: Float32Array[] = [];
    let offset = 0;
    let pos = 0;

    // Write WAV header
    const setUint16 = (data: number) => {
      view.setUint16(pos, data, true);
      pos += 2;
    };
    const setUint32 = (data: number) => {
      view.setUint32(pos, data, true);
      pos += 4;
    };

    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(buffer.numberOfChannels);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * buffer.numberOfChannels); // avg. bytes/sec
    setUint16(buffer.numberOfChannels * 2); // block-align
    setUint16(16); // 16-bit
    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length

    // Write interleaved data
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }

    while (pos < length) {
      for (let i = 0; i < buffer.numberOfChannels; i++) {
        const sample = Math.max(-1, Math.min(1, channels[i][offset]));
        view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
        pos += 2;
      }
      offset++;
    }

    return arrayBuffer;
  }

  /**
   * Play a sound effect
   */
  play(effect: SoundEffect, volumeOverride?: number) {
    if (!this.enabled) return;

    const sound = this.sounds.get(effect);
    if (!sound) return;

    try {
      // Clone the audio element to allow overlapping plays
      const clone = sound.cloneNode() as HTMLAudioElement;
      clone.volume = volumeOverride ?? this.volume;

      // Play the sound
      const playPromise = clone.play();

      // Handle play promise (required for some browsers)
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.debug("Sound playback failed:", error);
        });
      }

      // Clean up after playing
      clone.addEventListener("ended", () => {
        clone.remove();
      });
    } catch (e) {
      console.debug("Error playing sound:", e);
    }
  }

  /**
   * Set master volume (0-1)
   */
  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach((sound) => {
      sound.volume = this.volume;
    });
  }

  /**
   * Enable/disable sounds
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  /**
   * Check if sounds are enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();

// ==================== CONVENIENCE FUNCTIONS ====================

/**
 * Play sound with haptic feedback
 */
export const playWithHaptic = (
  sound: SoundEffect,
  haptic: HapticPattern,
  volume?: number
) => {
  soundManager.play(sound, volume);
  triggerHaptic(haptic);
};

/**
 * Button click feedback
 */
export const buttonClickFeedback = () => {
  playWithHaptic("click", "light");
};

/**
 * Button hover feedback
 */
export const buttonHoverFeedback = () => {
  soundManager.play("hover", 0.3);
};

/**
 * Success feedback
 */
export const successFeedback = () => {
  playWithHaptic("success", "success");
};

/**
 * Error feedback
 */
export const errorFeedback = () => {
  playWithHaptic("error", "error");
};

/**
 * XP gain feedback
 */
export const xpGainFeedback = () => {
  playWithHaptic("xpGain", "light");
};

/**
 * Level up feedback
 */
export const levelUpFeedback = () => {
  playWithHaptic("levelUp", "success");
};

/**
 * Badge earned feedback
 */
export const badgeEarnedFeedback = () => {
  playWithHaptic("badgeEarned", "success");
};

/**
 * Coin collected feedback
 */
export const coinFeedback = () => {
  playWithHaptic("coin", "light");
};

/**
 * Unlock feedback
 */
export const unlockFeedback = () => {
  playWithHaptic("unlock", "success");
};

// ==================== PREFERENCES ====================

const STORAGE_KEY = "claymind_audio_preferences";

interface AudioPreferences {
  soundEnabled: boolean;
  hapticEnabled: boolean;
  volume: number;
}

/**
 * Load audio preferences from localStorage
 */
export const loadAudioPreferences = (): AudioPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const prefs = JSON.parse(stored);
      soundManager.setEnabled(prefs.soundEnabled);
      soundManager.setVolume(prefs.volume);
      return prefs;
    }
  } catch (e) {
    console.debug("Failed to load audio preferences");
  }

  // Default preferences
  return {
    soundEnabled: true,
    hapticEnabled: true,
    volume: 0.5,
  };
};

/**
 * Save audio preferences to localStorage
 */
export const saveAudioPreferences = (prefs: AudioPreferences) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    soundManager.setEnabled(prefs.soundEnabled);
    soundManager.setVolume(prefs.volume);
  } catch (e) {
    console.debug("Failed to save audio preferences");
  }
};

/**
 * React hook for audio preferences
 */
export const useAudioPreferences = () => {
  if (typeof window === "undefined") {
    return {
      soundEnabled: true,
      hapticEnabled: true,
      volume: 0.5,
      setSoundEnabled: () => {},
      setHapticEnabled: () => {},
      setVolume: () => {},
    };
  }

  const [prefs, setPrefs] = useState<AudioPreferences>(loadAudioPreferences());

  const setSoundEnabled = (enabled: boolean) => {
    const newPrefs = { ...prefs, soundEnabled: enabled };
    setPrefs(newPrefs);
    saveAudioPreferences(newPrefs);
  };

  const setHapticEnabled = (enabled: boolean) => {
    const newPrefs = { ...prefs, hapticEnabled: enabled };
    setPrefs(newPrefs);
    saveAudioPreferences(newPrefs);
  };

  const setVolume = (volume: number) => {
    const newPrefs = { ...prefs, volume };
    setPrefs(newPrefs);
    saveAudioPreferences(newPrefs);
  };

  return {
    ...prefs,
    setSoundEnabled,
    setHapticEnabled,
    setVolume,
  };
};

// Import useState at the top
import { useState } from "react";

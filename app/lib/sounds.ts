let audioContext: AudioContext | null = null;
let keyboardBuffer: AudioBuffer | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

async function loadKeyboardBuffer(): Promise<void> {
  if (keyboardBuffer) return;
  try {
    const res = await fetch("/sounds/cherrymx-black-pbt/sound.ogg");
    const arrayBuffer = await res.arrayBuffer();
    const ctx = getAudioContext();
    keyboardBuffer = await ctx.decodeAudioData(arrayBuffer);
  } catch {}
}

if (typeof window !== "undefined") {
  loadKeyboardBuffer();
}

const SCANCODE_MAP: Record<string, number> = {
  "Escape": 1, "Digit1": 2, "Digit2": 3, "Digit3": 4, "Digit4": 5,
  "Digit5": 6, "Digit6": 7, "Digit7": 8, "Digit8": 9, "Digit9": 10, "Digit0": 11,
  "Minus": 12, "Equal": 13, "Backspace": 14, "Tab": 15,
  "KeyQ": 16, "KeyW": 17, "KeyE": 18, "KeyR": 19, "KeyT": 20,
  "KeyY": 21, "KeyU": 22, "KeyI": 23, "KeyO": 24, "KeyP": 25,
  "BracketLeft": 26, "BracketRight": 27, "Enter": 28,
  "ControlLeft": 29, "KeyA": 30, "KeyS": 31, "KeyD": 32, "KeyF": 33,
  "KeyG": 34, "KeyH": 35, "KeyJ": 36, "KeyK": 37, "KeyL": 38,
  "Semicolon": 39, "Quote": 40, "Backquote": 41, "ShiftLeft": 42,
  "Backslash": 43, "KeyZ": 44, "KeyX": 45, "KeyC": 46, "KeyV": 47,
  "KeyB": 48, "KeyN": 49, "KeyM": 50, "Comma": 51, "Period": 52, "Slash": 53,
  "ShiftRight": 54, "NumpadMultiply": 55, "AltLeft": 56, "Space": 57,
  "CapsLock": 58, "F1": 59, "F2": 60, "F3": 61, "F4": 62, "F5": 63,
  "F6": 64, "F7": 65, "F8": 66, "F9": 67, "F10": 68,
  "NumLock": 69, "ScrollLock": 70, "Home": 71, "ArrowUp": 72,
  "PageUp": 73, "NumpadSubtract": 74, "ArrowLeft": 75, "ArrowDown": 76,
  "ArrowRight": 77, "NumpadAdd": 78, "End": 79, "PageDown": 80,
  "Insert": 81, "Delete": 82, "Pause": 83,
  "F11": 87, "F12": 88,
};

const KEY_DEFS: Record<number, [number, number]> = {
  1: [2078, 176], 2: [9291, 164], 3: [9702, 153], 4: [10097, 140],
  5: [10459, 165], 6: [10859, 165], 7: [11250, 165], 8: [11648, 159],
  9: [12014, 150], 10: [12414, 136], 11: [12826, 137], 12: [13227, 138],
  13: [13625, 134], 14: [14035, 137], 15: [15707, 163],
  16: [16114, 157], 17: [16515, 150], 18: [16889, 147], 19: [17253, 161],
  20: [17630, 156], 21: [18024, 140], 22: [18416, 134], 23: [18815, 140],
  24: [19229, 128], 25: [19632, 127], 26: [20024, 131], 27: [20438, 131],
  28: [27154, 171], 29: [33678, 163], 30: [22850, 160], 31: [23243, 156],
  32: [23645, 155], 33: [24034, 152], 34: [24445, 146], 35: [24824, 148],
  36: [25181, 164], 37: [25593, 145], 38: [25993, 139], 39: [26393, 136],
  40: [26801, 128], 41: [8869, 181], 42: [28061, 186], 43: [20858, 129],
  44: [28466, 161], 45: [28845, 151], 46: [29208, 156], 47: [29571, 144],
  48: [29926, 159], 49: [30248, 139], 50: [30598, 140], 51: [30981, 130],
  52: [31353, 128], 53: [31740, 126], 54: [32135, 169], 55: [8372, 140],
  56: [34451, 164], 57: [34906, 168], 58: [22462, 166],
  59: [2511, 186], 60: [2919, 177], 61: [3307, 185], 62: [3700, 176],
  63: [4164, 148], 64: [4613, 155], 65: [5024, 150], 66: [5438, 147],
  67: [5862, 149], 68: [6270, 138], 69: [7547, 134], 70: [7957, 141],
  71: [14524, 141], 72: [14949, 119], 73: [15311, 143],
  74: [13227, 138], 75: [21286, 113], 76: [21671, 146], 77: [22078, 134],
  78: [14035, 137], 79: [36831, 144], 80: [37213, 144],
  81: [37569, 155], 82: [32135, 169], 83: [32948, 138],
  87: [6697, 137], 88: [7122, 136],
};

export const sounds = {
  click: () => {
    try {
      const ctx = getAudioContext();
      const t = ctx.currentTime;

      const noise = ctx.createBufferSource();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.008, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 50);
      }
      noise.buffer = buf;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 4000 + Math.random() * 1000;
      filter.Q.value = 3;

      const gain = ctx.createGain();
      gain.gain.value = 0.3;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(t);
    } catch {}
  },

  keypress: (key = "") => {
    if (keyboardBuffer) {
      try {
        const scancode = SCANCODE_MAP[key];
        if (scancode !== undefined) {
          const def = KEY_DEFS[scancode];
          if (def) {
            const ctx = getAudioContext();
            const [offsetMs, durationMs] = def;
            const src = ctx.createBufferSource();
            src.buffer = keyboardBuffer;
            const gain = ctx.createGain();
            gain.gain.value = 0.8;
            src.connect(gain);
            gain.connect(ctx.destination);
            src.start(ctx.currentTime, offsetMs / 1000, durationMs / 1000);
            return;
          }
        }
      } catch {}
    }
  },
};

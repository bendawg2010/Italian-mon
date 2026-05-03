// Generates a 30-second WAV chiptune that matches the in-game soundtrack
// (same lead + bass melodies + 144 BPM tempo as js/audio.js's Music IIFE).
// Output: ad/public/music.wav — referenced by the Remotion ad's <Audio>.
//
// Synthesis is a tiny additive synth: square wave for the lead (with a
// touch of a second harmonic for "fatness"), triangle wave for the bass.
// Linear ADSR-ish envelope per note. Mono 44.1kHz so the file stays small.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "public", "music.wav");

const SAMPLE_RATE = 44100;
const DURATION_S = 30;       // generate 30s, ad is ~22s — gives a tail
const TOTAL_SAMPLES = SAMPLE_RATE * DURATION_S;
const BPM = 144;
const BEAT = 60 / BPM;       // seconds per beat

// MIDI note → Hz, same as js/audio.js
const note = (n) => 440 * Math.pow(2, (n - 69) / 12);

// Same melodies as the in-game music
const LEAD = [
  [note(72), 0.5], [note(76), 0.5], [note(79), 0.5], [note(76), 0.5],
  [note(74), 0.5], [note(77), 0.5], [note(72), 0.5], [0, 0.5],
  [note(74), 0.5], [note(77), 0.5], [note(81), 0.5], [note(77), 0.5],
  [note(76), 0.5], [note(72), 0.5], [note(69), 1.0],
  [note(72), 0.5], [note(76), 0.5], [note(79), 0.5], [note(83), 0.5],
  [note(81), 0.5], [note(79), 0.5], [note(77), 1.0],
  [note(76), 0.5], [note(74), 0.5], [note(72), 0.5], [note(69), 0.5],
  [note(72), 1.0], [0, 1.0],
];
const BASS = [
  [note(48), 1.0], [note(52), 1.0], [note(55), 1.0], [note(52), 1.0],
  [note(50), 1.0], [note(53), 1.0], [note(48), 1.0], [note(48), 1.0],
  [note(48), 1.0], [note(52), 1.0], [note(55), 1.0], [note(59), 1.0],
  [note(57), 1.0], [note(53), 1.0], [note(48), 1.0], [note(48), 1.0],
];

// Build a stream of notes that loops to fill DURATION_S
function buildStream(pattern) {
  const stream = [];
  let t = 0;
  while (t < DURATION_S) {
    for (const [freq, beats] of pattern) {
      if (t >= DURATION_S) break;
      const dur = beats * BEAT;
      stream.push({ freq, t, dur });
      t += dur;
    }
  }
  return stream;
}
const leadStream = buildStream(LEAD);
const bassStream = buildStream(BASS);

// Waveforms
function sine(phase) { return Math.sin(phase * Math.PI * 2); }
function triangle(phase) {
  const p = phase % 1;
  return p < 0.5 ? 4*p - 1 : 3 - 4*p;
}

// Soft pad envelope: slow attack + long release so the melody breathes
// instead of clicking. The lead is meant to sit under the video, not
// punch through it.
function envelope(tInNote, dur) {
  const attack = 0.06;
  const release = Math.min(0.18, dur * 0.4);
  if (tInNote < attack) return (tInNote / attack);
  if (tInNote > dur - release) return Math.max(0, (dur - tInNote) / release);
  return 1.0;
}

const buf = new Float32Array(TOTAL_SAMPLES);

function renderStream(stream, waveFn, gain, harmonic2 = 0) {
  for (const { freq, t, dur } of stream) {
    if (freq <= 0) continue;
    const start = Math.floor(t * SAMPLE_RATE);
    // Let notes ring out past their nominal duration for legato feel
    const tail = 0.25;
    const end = Math.min(TOTAL_SAMPLES, Math.floor((t + dur + tail) * SAMPLE_RATE));
    let phase = 0;
    let phase2 = 0;
    const phaseStep = freq / SAMPLE_RATE;
    const phaseStep2 = (freq * 2) / SAMPLE_RATE;
    for (let i = start; i < end; i++) {
      const tInNote = (i - start) / SAMPLE_RATE;
      // Extend envelope into the tail with a smooth decay
      let env;
      if (tInNote <= dur) {
        env = envelope(tInNote, dur);
      } else {
        const tailProg = (tInNote - dur) / tail;
        env = Math.max(0, 1 - tailProg) * 0.4;  // fade tail to silence
      }
      const sample = waveFn(phase) + (harmonic2 ? waveFn(phase2) * harmonic2 : 0);
      buf[i] += sample * env * gain;
      phase += phaseStep;
      phase2 += phaseStep2;
    }
  }
}

// Lead = soft sine (much gentler than square), barely-there harmonic
renderStream(leadStream, sine, 0.07, 0.04);
// Bass = warm triangle, slightly louder than lead so it grounds the mix
renderStream(bassStream, triangle, 0.10);

// One-pole low-pass: kills high-frequency harshness, makes it sound
// like a music-from-the-next-room vibe instead of an arcade cabinet.
const cutoff = 2400; // Hz
const rc = 1.0 / (2 * Math.PI * cutoff);
const dt = 1.0 / SAMPLE_RATE;
const alpha = dt / (rc + dt);
let prev = 0;
for (let i = 0; i < buf.length; i++) {
  prev = prev + alpha * (buf[i] - prev);
  buf[i] = prev;
}

// Gentle soft clip + master gain — leaves headroom so the chiptune
// sits BEHIND the (eventual) voiceover / SFX rather than competing.
let peak = 0;
for (let i = 0; i < buf.length; i++) {
  buf[i] = Math.tanh(buf[i] * 1.0) * 0.55;
  if (Math.abs(buf[i]) > peak) peak = Math.abs(buf[i]);
}

console.log(`Synthesized ${DURATION_S}s @ ${SAMPLE_RATE}Hz, peak=${peak.toFixed(3)}`);

// Write 16-bit PCM mono WAV
function writeWav(samples) {
  const numSamples = samples.length;
  const dataLen = numSamples * 2;
  const totalLen = 44 + dataLen;
  const out = Buffer.alloc(totalLen);
  let p = 0;
  out.write("RIFF", p); p += 4;
  out.writeUInt32LE(totalLen - 8, p); p += 4;
  out.write("WAVE", p); p += 4;
  out.write("fmt ", p); p += 4;
  out.writeUInt32LE(16, p); p += 4;            // fmt chunk size
  out.writeUInt16LE(1, p); p += 2;             // PCM
  out.writeUInt16LE(1, p); p += 2;             // 1 channel (mono)
  out.writeUInt32LE(SAMPLE_RATE, p); p += 4;
  out.writeUInt32LE(SAMPLE_RATE * 2, p); p += 4; // byte rate
  out.writeUInt16LE(2, p); p += 2;             // block align (mono * 2 bytes)
  out.writeUInt16LE(16, p); p += 2;            // bits per sample
  out.write("data", p); p += 4;
  out.writeUInt32LE(dataLen, p); p += 4;
  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    out.writeInt16LE(Math.round(s * 32767), p);
    p += 2;
  }
  return out;
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, writeWav(buf));
console.log(`Wrote ${OUT}`);

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

// Render one wave into a Float32 buffer
function square(phase) { return phase % 1 < 0.5 ? 1 : -1; }
function triangle(phase) {
  const p = phase % 1;
  return p < 0.5 ? 4*p - 1 : 3 - 4*p;
}

function envelope(tInNote, dur) {
  // Quick attack, slow decay, soft release
  const attack = 0.01;
  const release = 0.06;
  if (tInNote < attack) return tInNote / attack;
  if (tInNote > dur - release) return Math.max(0, (dur - tInNote) / release);
  // Mild decay during sustain so notes don't sound static
  const sustainStart = attack;
  const sustainEnd = dur - release;
  const sustainProg = (tInNote - sustainStart) / Math.max(0.001, sustainEnd - sustainStart);
  return 1.0 - sustainProg * 0.3;
}

const buf = new Float32Array(TOTAL_SAMPLES);

function renderStream(stream, waveFn, gain) {
  for (const { freq, t, dur } of stream) {
    if (freq <= 0) continue;
    const start = Math.floor(t * SAMPLE_RATE);
    const end = Math.min(TOTAL_SAMPLES, Math.floor((t + dur) * SAMPLE_RATE));
    let phase = 0;
    const phaseStep = freq / SAMPLE_RATE;
    for (let i = start; i < end; i++) {
      const tInNote = (i - start) / SAMPLE_RATE;
      const env = envelope(tInNote, dur);
      buf[i] += waveFn(phase) * env * gain;
      phase += phaseStep;
    }
  }
}

renderStream(leadStream, square, 0.18);
renderStream(bassStream, triangle, 0.22);

// Soft clip + final mix gain
let peak = 0;
for (let i = 0; i < buf.length; i++) {
  buf[i] = Math.tanh(buf[i] * 1.2) * 0.85;
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

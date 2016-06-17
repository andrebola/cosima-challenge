import { audio, audioContext } from 'soundworks/client';

export default class ThunderSynth {
  constructor(output, buffers) {
    this.buffers = buffers;

    this.gain = audioContext.createGain();
    this.gain.connect(output);
    this.gain.gain.value = 20;
  }

  trigger() {
    const bufferIndex = Math.floor(Math.random() * this.buffers.length);
    const buffer = this.buffers[bufferIndex];
    const now = audioContext.currentTime;
    const attack = 0.1;
    const offset = Math.random() * 0.5;
    const duration = buffer.duration - offset;
    const release = duration - attack;
    const gain = Math.random() * 0.5 + 0.5;

    const env = audioContext.createGain();
    env.connect(this.gain);
    env.gain.value = 0;
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(gain, now + attack);
    env.gain.linearRampToValueAtTime(0, now + duration);

    const source = audioContext.createBufferSource();
    source.connect(env);
    source.buffer = buffer;

    source.start(now, offset);
    source.stop(now + duration);
  }
}

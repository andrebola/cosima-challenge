import { audio, audioContext } from 'soundworks/client';

export default class RainSynth {
  constructor(output, buffer) {
    this.buffer = buffer;

    this.env = audioContext.createGain();
    this.env.connect(output);
    this.env.gain.value = 1;
    this.env.gain.setValueAtTime(1, audioContext.currentTime);
  }

  start() {
    this.env.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.1);
  }

  stop() {
    this.env.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
  }

  trigger() {
    const buffer = this.buffer;
    const now = audioContext.currentTime;
    const attack = 0.1;
    const duration = 1;
    const release = duration - attack;
    const offset = Math.random() * (buffer.duration - release);
    const gain = Math.random() * 0.5 + 0.5;

    const env = audioContext.createGain();
    env.connect(this.env);
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

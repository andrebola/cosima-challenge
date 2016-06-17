import { audio, audioContext } from 'soundworks/client';

export default class RainSynth {
  constructor(output, buffer) {
    this.buffer = buffer;
    this.output = output;
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
    env.connect(this.output);
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

import { audio, audioContext } from 'soundworks/client';

function createWhiteNoiseBuffer(duration, ctx) {
  const buffer = ctx.createBuffer(1, duration * ctx.sampleRate, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0, l = data.length; i < l; i++)
    data[i] = Math.random();

  return buffer;
}

export default class WindSynth {
  constructor(output) {
    this.env = audioContext.createGain();
    this.env.connect(output);
    this.env.gain.value = 0;
    this.env.gain.setValueAtTime(0, audioContext.currentTime);

    this.minCutoff = 500;
    this.maxCutoff = 4000; // audioContext.sampleRate / 2;
    this.logCutoffRatio = Math.log(this.maxCutoff / this.minCutoff);

    this.bandpass = audioContext.createBiquadFilter();
    this.bandpass.connect(this.env);
    // bandpass
    this.bandpass.type = 'bandpass';
    this.bandpass.frequency.value = this.minCutoff;
    this.bandpass.Q.value = 12;

    this.source = audioContext.createBufferSource();
    this.source.connect(this.bandpass);
    this.source.buffer = createWhiteNoiseBuffer(2, audioContext);
    this.source.loop = true;
    this.source.start(audioContext.currentTime);
  }

  start() {
    const now = audioContext.currentTime;
    this.env.gain.cancelScheduledValues(now);
    this.env.gain.setValueAtTime(this.env.gain.value, now);
    this.env.gain.linearRampToValueAtTime(12, audioContext.currentTime + 0.25);
  }

  stop() {
    const now = audioContext.currentTime;
    this.env.gain.cancelScheduledValues(now);
    this.env.gain.setValueAtTime(this.env.gain.value, now);
    this.env.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
  }

  setCutoffFrequency(value) {
    const cutoffFrequency = this.minCutoff * Math.exp(this.logCutoffRatio * value);
    this.bandpass.frequency.value = cutoffFrequency;
  }
}

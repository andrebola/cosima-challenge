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

    this.minCutoff = 200;
    this.maxCutoff = 2000; // audioContext.sampleRate / 2;
    this.logCutoffRatio = Math.log(this.maxCutoff / this.minCutoff);

    this.lowpass = audioContext.createBiquadFilter();
    this.lowpass.connect(this.env);
    // bandpass
    this.lowpass.type = 'bandpass';
    this.lowpass.frequency.value = this.minCutoff;
    this.lowpass.Q.value = 16;

    this.source = audioContext.createBufferSource();
    this.source.connect(this.lowpass);
    this.source.buffer = createWhiteNoiseBuffer(2, audioContext);
    this.source.loop = true;
    this.source.start(audioContext.currentTime);
  }

  start() {
    this.env.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.1);
  }

  stop() {
    this.env.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
  }

  setCutoffFrequency(value) {
    const cutoffFrequency = this.minCutoff * Math.exp(this.logCutoffRatio * value);
    this.lowpass.frequency.value = cutoffFrequency;
  }
}

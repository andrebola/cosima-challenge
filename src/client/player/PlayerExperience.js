/* Colors
	Green - #b2e95a;
	Muted Green - #74983B;
	Grey / Blue - #74988A;
	? - #6184ab;
	Black - #000;
*/

import * as soundworks from 'soundworks/client';
import Circles from './Circles';
import BirdSynth from './BirdSynth';
import WindSynth from './WindSynth';
import RainSynth from './RainSynth';

const audioContext = soundworks.audioContext;
const refreshTimeout = 100;
const TouchSurface = soundworks.TouchSurface;

const viewTemplate = `
  <canvas class="background"></canvas>
  <div class="foreground">
    <div class="section-top flex-middle"></div>
    <input type="range" min="0" max="1" step="0.01" value="0" id="range" />
    <div class="section-center">

    </div>
    <div class="section-bottom flex-center"></div>
  </div>
`;

const birdNames = ['alauda', 'larus', 'picus', 'turdus'];

// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain, files) {
    super();

    this.platform = this.require('platform', { features: ['web-audio'] });
    this.loader = this.require('loader', { files, assetsDomain });

    this.onTouchStart = this.onTouchStart.bind(this);
    this.refreshState = this.refreshState.bind(this);

    this._updateWind = this._updateWind.bind(this);
  }

  init() {
    this.state = null;
    this.stateInput = null;

    this.viewTemplate = viewTemplate;
    this.viewCtor = soundworks.CanvasView;
    this.viewEvents = {
      'input #range': this._updateWind
    };
    this.viewContent = {
      currentState: '',
    }

    this.refreshState();

    this.view = this.createView();

    const output = audioContext.destination;
    const birdIndex = Math.floor(birdNames.length * Math.random());
    let { audio, markers } = this.loader.get(birdNames[birdIndex]);

    this.birdSynth = new BirdSynth(output, audio, markers);
    this.windSynth = new WindSynth(output);

    const buffer = this.loader.get('rain').audio;
    this.rainSynth = new RainSynth(output, buffer);
  }

  start() {
    super.start(); // don't forget this

    if (!this.hasStarted)
      this.init();

    this.show();

    this.circlesRenderer = new Circles();
    this.view.addRenderer(this.circlesRenderer);

    this.view.setPreRender((ctx) => {
	  ctx.fillStyle = '#74983B';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });

	  const surface = new TouchSurface(this.view.$el);
	  surface.addListener('touchstart', this.onTouchStart);

    // When server send stop and start message execute corresponding functions
    this.receive('start', this.onStartMessage);
    this.receive('stop', this.onStopMessage);

    const that = this;
    this.rainSynth.start();

    (function triggerRainDrop() {
      that.rainSynth.trigger();
      setTimeout(triggerRainDrop, Math.random() * 150 + 100);
    }());
  }

  onTouchStart(touchId, normX, normY) {
    this.circlesRenderer.trigger(touchId, normX, normY, { duration: 0.4 });

    const energy = Math.random();
    // this.birdSynth.trigger(energy);
  }

  refreshState() {
    this.state = 1;
    this.send('current:state', this.state);

    setTimeout(this.refreshState, refreshTimeout);
  }

  _updateWind(e) {
    const value = e.target.value;
    this.windSynth.setCutoffFrequency(value);
  }
}

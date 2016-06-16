/* Colors
	Green - #b2e95a;
	Muted Green - #74983B;
	Grey / Blue - #74988A; 
	? - #6184ab; 
	Black - #000;
*/

import * as soundworks from 'soundworks/client';
import PlayerRenderer from './PlayerRenderer';
import Circles from './Circles';
import BirdSynth from './BirdSynth';

const audioContext = soundworks.audioContext;
const TouchSurface = soundworks.TouchSurface;


const viewTemplate = `
  <canvas class="background"></canvas>
  <div class="foreground">
    <div class="section-top flex-middle"></div>
    <div class="section-center flex-center">
    <div class="section-bottom flex-center">
  </div>
`;

const birdNames = ['alauda', 'larus', 'picus', 'turdus'];

// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain, files) {
    super();

    this.platform = this.require('platform', { showDialog: true });
    this.loader = this.require('loader', { files, assetsDomain });

    this.onTouchStart = this.onTouchStart.bind(this);
  }

  init() {
    this.state = null;
    this.stateInput = null;

    this.viewTemplate = viewTemplate;
    this.viewCtor = soundworks.CanvasView;
    this.viewEvents = {
      // 'touchstart #button': this.onTouchStart,
    };
    this.viewContent = {
      currentState: '',
    }

    this.view = this.createView();

    const output = audioContext.destination;
    const birdIndex = Math.floor(birdNames.length * Math.random());
    const { audio, markers } = this.loader.get(birdNames[birdIndex]);
    this.birdSynth = new BirdSynth(output, audio, markers);
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

    // If the user clicks the button the send notification to server
    document.getElementById('button').addEventListener('click', () => {
      const energy = Math.random();
      this.birdSynth.trigger(energy);
    });

    // When server send stop and start message execute corresponding functions
    this.receive('start', this.onStartMessage);
    this.receive('stop', this.onStopMessage);
  }

  onTouchStart(touchId, normX, normY) {
    this.circlesRenderer.trigger(touchId, normX, normY, { duration: 0.4 });
  }
}

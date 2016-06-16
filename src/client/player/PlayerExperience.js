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
// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain, audioFiles) {
    super();

    this.platform = this.require('platform', { showDialog: true });

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
  }

  onTouchStart(touchId, normX, normY) {
    this.circlesRenderer.trigger(touchId, normX, normY, { duration: 0.4 });
  }
}

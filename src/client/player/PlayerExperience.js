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

const audioContext = soundworks.audioContext;
const refreshTimeout = 100;
const TouchSurface = soundworks.TouchSurface;

const viewTemplate = `
  <canvas class="background"></canvas>
  <div class="foreground">
    <div class="section-top flex-middle"></div>
    <div class="section-center flex-center">
    <div class="section-bottom flex-center">
  </div>
`;

const statePeriod = 0.2;
const period = 0.05;
const kGravityFilter = Math.exp(-2 * Math.PI * period / 0.1);

const birdNames = ['alauda', 'larus', 'picus', 'turdus'];
const stateNames = ['still', 'birds', 'wind', 'rain', 'thunder', 'lightning'];
const stateIndices = {};

for(let index = 0; index < stateNames.length; index++) {
  const name = stateNames[index];
  stateIndices[name] = index;
}

// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain, files) {
    super();

    this.platform = this.require('platform', {
      showDialog: true
    });

    this.loader = this.require('loader', {
      files,
      assetsDomain
    });

    this.motionInput = this.require('motion-input', {
      descriptors: ['accelerationIncludingGravity', 'rotationRate']
    });

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onAccelerationIncludingGravity = this.onAccelerationIncludingGravity.bind(this);
    this.onTimeout = this.onTimeout.bind(this);
    this.refreshState = this.refreshState.bind(this);
  }

  init() {
    this.lastAccX = undefined;
    this.lastAccY = undefined;
    this.lastAccY = undefined;
    this.lastDynAccX = 0;
    this.lastDynAccY = 0;
    this.lastDynAccZ = 0;
    this.accMag = 1;
    this.dynAccMag = 0;
    this.slowDeltaAccMag = 0;
    this.slowDeltaAccMagSum = 0;
    this.slowDynAccMag = 0;
    this.slowDynAccMagSum = 0;
    this.slowAccCount = 0;
    this.hasTouched = false;

    this.viewTemplate = viewTemplate;
    this.viewCtor = soundworks.CanvasView;
    this.viewEvents = {
      // 'touchstart #button': this.onTouchStart,
    };
    this.viewContent = {
      currentState: '',
    }

    this.refreshState();

    this.view = this.createView();

    const output = audioContext.destination;
    const birdIndex = Math.floor(birdNames.length * Math.random());
    const { audio, markers } = this.loader.get(birdNames[birdIndex]);
    this.birdSynth = new BirdSynth(output, audio, markers);

    if (this.motionInput.isAvailable('accelerationIncludingGravity')) {
      this.motionInput.addListener('accelerationIncludingGravity', this.onAccelerationIncludingGravity);
    }

    setTimeout(this.onTimeout, 1000 * statePeriod);
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
  }

  onTouchStart(touchId, normX, normY) {
    this.circlesRenderer.trigger(touchId, normX, normY, { duration: 0.4 });

    const energy = Math.random();
    this.birdSynth.trigger(energy);
    this.hasTouched = true;
  }

  onAccelerationIncludingGravity(acc) {
    const accX = acc[0] / 9.81;
    const accY = acc[1] / 9.81;
    const accZ = acc[2] / 9.81;
    const lastAccX = this.lastAccX;

    if(lastAccX !== undefined) {
      const lastAccY = this.lastAccY;
      const lastAccZ = this.lastAccZ;
      const lastDynAccX = this.lastDynAccX;
      const lastDynAccY = this.lastDynAccY;
      const lastDynAccZ = this.lastDynAccZ;
      const accMag = Math.sqrt(accX * accX + accY * accY + accZ * accZ);
      const deltaAccX = accX - lastAccX;
      const deltaAccY = accY - lastAccY;
      const deltaAccZ = accZ - lastAccZ;
      const deltaAccMag = Math.sqrt(deltaAccX * deltaAccX + deltaAccY * deltaAccY /*+ deltaAccZ * deltaAccZ*/);
      const dynAccX = (1 + kGravityFilter) * 0.5 * deltaAccX + kGravityFilter * lastDynAccX;
      const dynAccY = (1 + kGravityFilter) * 0.5 * deltaAccY + kGravityFilter * lastDynAccY;
      const dynAccZ = (1 + kGravityFilter) * 0.5 * deltaAccZ + kGravityFilter * lastDynAccZ;
      const dynAccMag = Math.min(2, Math.sqrt(dynAccX * dynAccX + dynAccY * dynAccY + dynAccZ * dynAccZ));
      const slowDynAccMag = this.slowDynAccMag;
      const slowDeltaAccMag = this.slowDeltaAccMag;

      this.accMag = accMag;
      this.dynAccMag = dynAccMag;

      this.slowDeltaAccMag = 0.95 * slowDeltaAccMag + 0.05 * deltaAccMag;
      this.slowDeltaAccMagSum += this.slowDeltaAccMag;
      this.slowDynAccMag = 0.95 * slowDynAccMag + 0.05 * dynAccMag;
      this.slowDynAccMagSum += this.slowDynAccMag;

      this.lastDynAccX = dynAccX;
      this.lastDynAccY = dynAccY;
      this.lastDynAccZ = dynAccZ;
      this.slowAccCount++;
    }

    this.lastAccX = accX;
    this.lastAccY = accY;
    this.lastAccZ = accZ;
  }

  onTimeout() {
    let state = 'still';

    if(this.hasTouched) {
      state = 'birds';
    } else {
      const slowAccCount = this.slowAccCount;
      const slowDeltaAccMagSum = this.slowDeltaAccMagSum;
      let meanSlowDeltaAccMag = 0;

      if(slowAccCount > 0) {
        meanSlowDeltaAccMag = slowDeltaAccMagSum / slowAccCount;
      }

      if (meanSlowDeltaAccMag > 1) {
        state = 'thunder';
      } else if (meanSlowDeltaAccMag > 0.03) {
        const slowDynAccMagSum = this.slowDynAccMagSum;
        let meanSlowDynAccMag = 0;

        if(slowAccCount > 0) {
          meanSlowDynAccMag = slowDynAccMagSum / slowAccCount;
        }

        if(meanSlowDynAccMag > 0.15) {
          state = 'rain';
        } else {
          state = 'wind';
        }
      }
    }

    const index = stateIndices[state];
    this.send('state', index, state);

    this.slowDeltaAccMagSum = 0;
    this.slowDynAccMagSum = 0;
    this.slowAccCount = 0;
    this.hasTouched = false;

    setTimeout(this.onTimeout, 1000 * statePeriod);
  }

  refreshState() {
    this.state = 1;
    this.send('current:state', this.state);

    setTimeout(this.refreshState, refreshTimeout);
  }

}

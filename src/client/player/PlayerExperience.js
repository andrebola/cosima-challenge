import * as soundworks from 'soundworks/client';
import Circles from './Circles';
import RainDrops from './Rain';
import BackgroundRenderer from './Background';
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
    <div class="section-center">

    </div>
    <div class="section-bottom flex-center"></div>
  </div>
`;

const statePeriod = 0.2;
const period = 0.05;
const kGravityFilter = Math.exp(-2 * Math.PI * period / 0.1);

const birdNames = ['alauda', 'larus', 'picus', 'turdus'];
const stateNames = ['still', 'birds', 'wind', 'rain', 'thunder'];
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

    this.platform = this.require('platform', { features: ['web-audio', 'wake-lock'] });
    this.loader = this.require('loader', { files, assetsDomain });

    this.motionInput = this.require('motion-input', {
      descriptors: ['accelerationIncludingGravity', 'rotationRate']
    });

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onAccelerationIncludingGravity = this.onAccelerationIncludingGravity.bind(this);
    this.onTimeout = this.onTimeout.bind(this);

    this._updateWind = this._updateWind.bind(this);
  }

  init() {
	this.state = 'still';
	this.stateIndex = 0;

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
      'input #range': this._updateWind
    };
    this.viewContent = {
      currentState: '',
    }

    this.view = this.createView();

    const output = audioContext.destination;
    const birdIndex = Math.floor(birdNames.length * Math.random());
    let { audio, markers } = this.loader.get(birdNames[birdIndex]);

    this.birdSynth = new BirdSynth(output, audio, markers);
    this.windSynth = new WindSynth(output);

    const buffer = this.loader.get('rain').audio;
    this.rainSynth = new RainSynth(output, buffer);

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

    this.bgRenderer = new BackgroundRenderer();
    this.bgRenderer.setColor(4);
	this.circlesRenderer = new Circles();
	this.rainRenderer = new RainDrops();

    this.view.addRenderer(this.bgRenderer);
    this.view.addRenderer(this.circlesRenderer);
    this.view.addRenderer(this.rainRenderer);

    this.rainRenderer.update();

    this.view.setPreRender((ctx) => {
	  ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });

    const surface = new TouchSurface(this.view.$el);
    surface.addListener('touchstart', this.onTouchStart);
  }



  onTouchStart(touchId, normX, normY) {
    this.circlesRenderer.trigger(touchId, normX, normY, { duration: 1 });
    const energy = Math.random();

    this.birdSynth.trigger(energy);
    this.hasTouched = true;
  }

  onAccelerationIncludingGravity(acc) {
    const accX = acc[0] / 9.81;
    const accY = acc[1] / 9.81;
    const accZ = acc[2] / 9.81;
    const lastAccX = this.lastAccX;

    if (lastAccX !== undefined) {
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

	  const index = stateIndices[this.state];

    if (index >= stateIndices.wind) {
	    // this.slowDeltaAccMag => use for wind
	    this.bgRenderer.setOpacity(1 - this.slowDeltaAccMag);
    } else {
	    this.bgRenderer.setOpacity(.75);
    }
  }

  onTimeout() {
    let state = 'still';

    if (this.hasTouched) {
      state = 'birds';
    } else {
      const slowAccCount = this.slowAccCount;
      const slowDeltaAccMagSum = this.slowDeltaAccMagSum;
      let meanSlowDeltaAccMag = 0;

      if (slowAccCount > 0) {
        meanSlowDeltaAccMag = slowDeltaAccMagSum / slowAccCount;
      }

      if (meanSlowDeltaAccMag > 1) {
        state = 'thunder';
      } else if (meanSlowDeltaAccMag > 0.03) {
        const slowDynAccMagSum = this.slowDynAccMagSum;
        let meanSlowDynAccMag = 0;

        if (slowAccCount > 0) {
          meanSlowDynAccMag = slowDynAccMagSum / slowAccCount;
        }

        if (meanSlowDynAccMag > 0.15) {
          state = 'rain';
        } else {
          state = 'wind';
        }
      }
    }

    const index = stateIndices[state];

    this.send('current:state', index, state);

	  this.state = state;
	  this.stateIndex = index;


    // THUNDER
    if (index >= stateIndices.thunder) {
      const thunderOptions = {
        duration: 0.5,
        xV: .00001,
        yV: .00001,
        velocity: 2000,
        color: '#ffffff',
      };

	    this.circlesRenderer.flash(1, thunderOptions);
    }

    // RAIN
    if (index >= stateIndices.rain) {
      if (!this.rainIsActive) {
  	    this.rainIsActive = true;

        const that = this;

    		(function triggerRainDrop() {
    	    if (that.rainIsActive) {
            const nbrRainDrops = Math.floor(Math.random() * 8);

            for (let  i = 0; i < nbrRainDrops; i++) {
      			  that.rainRenderer.trigger();
            }

      			that.rainSynth.trigger();
      			setTimeout(triggerRainDrop, Math.random() * 150 + 100);
          }
      	}());
      }
    } else {
      this.rainIsActive = false;
    }

    this.slowDeltaAccMagSum = 0;
    this.slowDynAccMagSum = 0;
    this.slowAccCount = 0;
    this.hasTouched = false;

    setTimeout(this.onTimeout, 1000 * statePeriod);
  }

  _updateWind(e) {
    const value = e.target.value;
    this.windSynth.setCutoffFrequency(value);
  }


}

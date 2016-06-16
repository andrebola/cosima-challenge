import * as soundworks from 'soundworks/client';
import PlayerRenderer from './PlayerRenderer';
import BirdSynth from './BirdSynth';

// inputs
import Touch from './inputs/Touch';

const SegmentedView = soundworks.SegmentedView;
const audioContext = soundworks.audioContext;

const viewTemplate = `
  <div id="interaction" class="stage2" ontouchstart="">
  <div id="buttons">
  <div id="btn_1" class="btn"></div>
  <div id="btn_2" class="btn"></div>
  <div id="btn_3" class="btn"></div>
  <div id="btn_4" class="btn"></div>
  <div id="btn_5" class="btn"></div>
  <div id="btn_6" class="btn"></div>
  <div id="btn_7" class="btn"></div>
  </div>
  </div>
`;

const birdNames = ['alauda', 'larus', 'picus', 'turdus'];

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
    this.onTimeout = this.onTimeout.bind(this);
  }

  init() {
    this.state = null;
    this.stateInput = null;

    this.viewTemplate = viewTemplate;
    this.viewCtor = SegmentedView;

    this.viewEvents = {
      'touchstart #button': this.onTouchStart,
    };

    this.viewContent = {
      currentState: '',
    }

    this.view = this.createView();

    const output = audioContext.destination;
    const birdIndex = Math.floor(birdNames.length * Math.random());
    const { audio, markers } = this.loader.get(birdNames[birdIndex]);
    this.birdSynth = new BirdSynth(output, audio, markers);

    if (this.motionInput.isAvailable('accelerationIncludingGravity')) {
      this.motionInput.addListener('accelerationIncludingGravity', (acc) => {
        const accX = acc[0] / 9.81;
        const accY = acc[1] / 9.81;
        const accZ = acc[2] / 9.81;
        const accMag = Math.sqrt(accX * accX + accY * accY + accZ * accZ);

        const lastAcc = this.lastAcc;
        const lastDynAcc = this.lastDynAcc;
        const dynAccX = (1 + kGravityFilter) * 0.5 * (accX - lastAcc[0]) + kGravityFilter * lastDynAcc[0];
        const dynAccY = (1 + kGravityFilter) * 0.5 * (accY - lastAcc[1]) + kGravityFilter * lastDynAcc[1];
        const dynAccZ = (1 + kGravityFilter) * 0.5 * (accZ - lastAcc[2]) + kGravityFilter * lastDynAcc[2];
        const dynAccMag = Math.sqrt(dynAccX * dynAccX + dynAccY * dynAccY + dynAccZ * dynAccZ);

        this.lastAcc[0] = accX;
        this.lastAcc[1] = accY;
        this.lastAcc[2] = accZ;

        this.lastDynAcc[0] = dynAccX;
        this.lastDynAcc[1] = dynAccY;
        this.lastDynAcc[2] = dynAccZ;

        this.accMag = accMag;
        this.slowEnergy = 0.90 * this.slowEnergy + 0.1 * dynAccMag;
      });
    }

    if (this.motionInput.isAvailable('rotationRate')) {
      this.motionInput.addListener('rotationRate', (gyro) => {
        const now = audioContext.currentTime;
        const gyroX = gyro[0];
        const gyroY = gyro[1];
        const gyroZ = gyro[2];
        const absGyroZ = Math.abs(gyroZ);
        const accMag = this.accMag;
        const slowEnergy = this.slowEnergy;
        let state = 'still';

        if (slowEnergy > 0.25) {
          state = 'fast';
        } else if (slowEnergy > 0.1) {
          state = 'run';
        } else if (slowEnergy > 0.02) {
          state = 'walk';
        }

        if (state !== this.state) {
          this.network.send('display', 'state', client.index, state);
          this.state = state;
        }

        const value = slowEnergy;
        this.renderer.setValue(value);
        this.network.send('display', 'display', client.index, value);
      });
    }

    setTimeout(this.onTimeout, 100);
  }

  start() {
    super.start(); // don't forget this

    if (!this.hasStarted)
      this.init();

    this.show();

    // document.getElementById('button').addEventListener('click', () => {
    //   const energy = Math.random();
    //   this.birdSynth.trigger(energy);
    // });
  }

  onTouchStart() {
    this.send('input:change');
  }

  onTimeout() {
    // send state
    setTimeout(this.onTimeout, 100);
  }
}

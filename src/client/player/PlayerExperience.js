import * as soundworks from 'soundworks/client';
import PlayerRenderer from './PlayerRenderer';

// inputs
import Touch from './inputs/Touch';

const SegmentedView = soundworks.SegmentedView;
const audioContext = soundworks.audioContext;


const viewTemplate = `
  <div class="section-top flex-middle">
    <p id="label"><%= currentState %></p>
  </div>
  <div class="section-center flex-center">
    <button id="button" class="btn">Click</button>
  </div>
  <div class="section-bottom"></div>
`;
// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain, audioFiles) {
    super();

    this.platform = this.require('platform', { showDialog: true });

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onStateUpdate = this.onStateUpdate.bind(this);
    this.onInputTrigger = this.onInputTrigger.bind(this);
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
  }

  start() {
    super.start(); // don't forget this

    if (!this.hasStarted)
      this.init();

    this.show();

    this.send('require:current:state');
    this.receive('update:state', this.onStateUpdate);
  }

  onTouchStart() {
    this.send('input:change');
  }

  onStateUpdate(stateName) {
    this.state = stateName;
    let stateInput = null;
    console.log('state:', this.state);

    // if (this.stateInput) {
    //   this.stateInput.stop();
    //   this.stateInput.removeListener(this.onInput);
    // }

    // switch (stateName) {
    //   case 'sunny':
    //     this.stateInput = new Touch(this.view.$el);
    //     break;
    //   case 'wind1':
    //     this.stateInput = new TouchAndHold(this.view.$el);
    //     break;
    //   case 'wind2':
    //     // this.stateInput = new Roll();
    //     break;
    //   case 'rain':
    //     // this.stateInput = new Shake(200);
    //     break;
    //   case 'thunder':
    //     // this.stateInput = new Shake(400);
    //     break;
    //   // case 'waves':
    //   //   stateInput = new Touch();
    //   //   break;
    // }

    // this.stateInput.addListener(this.onInputTrigger);
    // this.stateInput.start();

    this.view.content.currentState = this.state;
    this.view.render('#label');
  }

  onInputTrigger(...params) {
    this.send('input:change', this.state, ...params);
    console.log('input here!', params);
    // maybe update view with `params`
  }
}

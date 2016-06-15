import * as soundworks from 'soundworks/client';
import PlayerRenderer from './PlayerRenderer';
import BirdSynth from './BirdSynth';

const View = soundworks.View;
const audioContext = soundworks.audioContext;


const viewTemplate = `
  <div class="section-top"></div>
  <div class="section-center flex-center">
  <a href="#" id="button">Click</a>
  </div>
  <div class="section-bottom"></div>
`;

const birdNames = ['alauda', 'larus', 'picus', 'turdus'];

// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain, files) {
    super();

    this.platform = this.require('platform', { showDialog: true });

    this.loader = this.require('loader', { files });

    this.onStartMessage = this.onStartMessage.bind(this);
    this.onStopMessage = this.onStopMessage.bind(this);
    this.wait = true;
  }

  init() {
    this.viewTemplate = viewTemplate;
    this.viewCtor = View;
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

    // If the user clicks the button the send notification to server
    document.getElementById('button').addEventListener('click', () => {
      const energy = Math.random();
      this.birdSynth.trigger(energy);
    });

    // When server send stop and start message execute corresponding functions
    this.receive('start', this.onStartMessage);
    this.receive('stop', this.onStopMessage);
  }
/**
   * Callback to be executed when receiving the `start` message from the server.
   */
  onStartMessage() {
    // start synth and change background color
    this.view.$el.classList.add('active');
    this.wait = false;
  }

  /**
   * Callback to be executed when receiving the `stop` message from the server.
   */
  onStopMessage() {
    // stop synth and change background color
    this.view.$el.classList.remove('active');
    this.wait = true;
  }
  onTouchEnd() {
    if (!this.wait){
      this.send('input:change',"");
    }
  }
}

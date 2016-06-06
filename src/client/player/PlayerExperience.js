import * as soundworks from 'soundworks/client';
import PlayerRenderer from './PlayerRenderer';
const View = soundworks.View;

const audioContext = soundworks.audioContext;

const viewTemplate = `
  <div class="section-top"></div>
  <div class="section-center flex-center">
  <a href="#" id="button">Click</a>
  </div>
  <div class="section-bottom"></div>
`;

// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor() {
    super();

    this.platform = this.require('platform', { showDialog: true });

    this.onStartMessage = this.onStartMessage.bind(this);
    this.onStopMessage = this.onStopMessage.bind(this);
    this.wait = true;
  }

  init() {

    this.viewTemplate = viewTemplate;
    this.viewCtor = View;
    this.view = this.createView();

 }

  start() {
    super.start(); // don't forget this

    if (!this.hasStarted)
      this.init();

    this.show();

    var that = this;
    // If the user clicks the button the send notification to server
    document.getElementById("button").addEventListener("click", function(){that.onTouchEnd()});
   
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

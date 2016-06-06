import * as soundworks from 'soundworks/client';
import PlayerRenderer from './PlayerRenderer';

const audioContext = soundworks.audioContext;

const viewTemplate = `
  <canvas class="background"></canvas>
  <div class="foreground">
    <div class="section-top flex-middle"></div>
    <div class="section-center flex-center">
      <p class="big"><%= title %></p>
    </div>
    <div class="section-bottom flex-middle"></div>
  </div>
`;

// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor(audioFiles) {
    super();

    this.platform = this.require('platform', { features: ['web-audio'] });
  }

  init() {
    // initialize the view
    this.viewTemplate = viewTemplate;
    this.viewContent = { title: `Let's go!` };
    this.viewCtor = soundworks.CanvasView;
    this.view = this.createView();
  }

  start() {
    super.start(); // don't forget this

    // if the experience has never started, initialize it
    if (!this.hasStarted)
      this.init();
    
    // Handle click event from users
    this.receive('player:add', this.onPlayerList);
  }
  onPlayerList(playerList) {
    console.log("Received Click")
  }
}

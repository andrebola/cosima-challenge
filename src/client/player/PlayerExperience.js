import * as soundworks from 'soundworks/client';
import PlayerRenderer from './PlayerRenderer';
import $ from 'jquery';
window.$ = $;

const View = soundworks.View;
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
// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain, audioFiles) {
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
    //document.getElementById("button").addEventListener("click", function(){that.onTouchEnd()});
    $(".btn").on('mousedown touchstart', function() {
        $(this).addClass("touched");
    });
    $(".btn").on('mouseup touchend', function() {
        $(this).removeClass("touched");
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

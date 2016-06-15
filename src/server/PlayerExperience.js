import { Experience } from 'soundworks/server';


const states = ['sunny', 'wind1', 'wind2', 'rain'];
const duration = 1 * 60 * 1000;
const stateDuration = duration / states.length;
const transitionDuration = stateDuration / 3;

// const midiNotes = [0, 2, 4, 5, 7, 9, 11];
// function getRandomNoteFromCScale() {
//   const index = Math.floor(Math.random() * midiNotes.length);
//   const note = midiNotes[index];
//   const octava = Math.floor(Math.random() * 6);
//   return note + (12 * octava);
// }

// server-side 'player' experience.
export default class PlayerExperience extends Experience {
  constructor(clientType) {
    super(clientType);

    this.players = new Map();
    // this.stateThreshold = [10, 10, 10, 10, 10, 10];
    this.currentState = -1;
    this.hasStarted = false;
    // this.currentLevel = 0;
    // this.persistValue = 1000;

    this.onInputChange = this.onInputChange.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  // if anything needs to append when the experience starts
  start() {

  }

  // if anything needs to happen when a client enters the performance (*i.e.*
  // starts the experience on the client side), write it in the `enter` method
  enter(client) {
    super.enter(client);
    // define what to do ccording to the `client` type (i.e. `player` or `soloist`)
    switch (client.type) {
      case 'shared-env':
        this.onEnvEnter(client);
        break;
      case 'player':
        this.onPlayerEnter(client);
        break;
    }
  }

 formatClientInformations(client) {
    return {
      id: client.uuid,
      // states: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false },
    };
  }

 onEnvEnter(client) {
    // send the list of connected players
    // const playerInfos = Array.from(this.players.values())
    // ... not doing anything yet
    this.broadcast('shared-env', null, 'test', true);
  }

  onPlayerEnter(client) {
    // format infos from the player to be consmumed by the solist
    const infos = this.formatClientInformations(client);

    if (this.players.size === 0 && !this.hasStarted) {
      this.updateState();
      this.hasStarted = true;
    }

    // keep track of the informations
    this.players.set(client, infos);

    // listen touch inputs from the `player` client
    this.receive(client, 'input:change', this.onInputChange);

    this.receive(client, 'require:current:state', () => {
      this.send(client, 'update:state', states[this.currentState]);
    });
  }

  onInputChange(stateName, params) {
    const stateIndex = states.indexOf(stateName)
    const { states } = this.players.get(client);
    // const time = new Date().getTime();

    // if (!states[stateIndex] || time - states[stateIndex] > this.persistValue) {
    //   states[stateIndexe] = time;
    //   const size = Object.keys(this.players).length;
    //   this.currentLevel += 1 / size;
    // }

    // when the click event is received from the user we notify to all the shared-env clients
    // this.broadcast('shared-env', null, 'player:add', infos, getRandomNoteFromCScale);
  }

  // runCounter() {
  //   setTimeout(() => this.updateState, stateDuration);
  // }

  updateState() {
    this.currentState = (this.currentState + 1) % states.length;

    this.players.forEach((infos, player) => {
      setTimeout(() => {
        this.send(player, 'update:state', states[this.currentState]);
      }, Math.random() * transitionDuration);
    });

    const that = this;
    const nbrCuesPerState = 4;
    const cueDuration = stateDuration / nbrCuesPerState;

    console.log(stateDuration, cueDuration, transitionDuration);

    for (let i = 0; i < nbrCuesPerState; i++) {
      (function(i) {
        const cueIndex = (nbrCuesPerState * that.currentState) + i;
        setTimeout(function() {
          console.log('cue', cueIndex);
          that.broadcast('shared-env', null, 'cue', cueIndex);
        }, cueDuration * i);
      }(i));
    }

    setTimeout(this.updateState, stateDuration);
  }

  onPlayerExit(client) {
    // retrieve stored informations from the client
    const infos = this.players.get(client);
    // delete it from the stack of client `player`
    this.players.delete(client);
  }

  exit(client) {
    if (client.type === 'player')
      this.onPlayerExit(client);
  }
}

import { Experience } from 'soundworks/server';

// server-side 'player' experience.
export default class PlayerExperience extends Experience {
  constructor(clientType) {
    super(clientType);

    this.players = new Map();
    this.states = ['sunny', 'wind1', 'wind2', 'rain', 'thunder', 'waves'];
    this.currentState = 0;
    this.currentLevel = 0;
    this.persistValue = 1000;
  }

  // if anything needs to append when the experience starts
  start() {}

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
      states: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false};
    };
  }
 
 onEnvEnter(client) {
    // send the list of connected players
    const playerInfos = Array.from(this.players.values())
    // ... not doing anything yet
  }
 
  onPlayerEnter(client) {
    // format infos from the player to be consmumed by the solist
    const infos = this.formatClientInformations(client);
    // keep track of the informations
    this.players.set(client, infos);

    // listen touch inputs from the `player` client
    this.send(client, 'start');
    this.receive(client, 'input:change', (radius, coordinates) => {
      if (this.currentLevel > 0.9){
        updateState();
      }
      info = this.players.get(client);
      var n = new Date().getTime();
      if (!info['states'][this.currentState] || n - info['states'][this.currentState] > this.persistValue){
        info['states'][this.currentState] = n;
        var size = Object.keys(this.players).length;
        this.currentLevel += 1/size;
      }



      this.send(client, 'stop');
      // when the click event is received from the user we notify to all the 
      // shared-env clients
      this.broadcast('shared-env', null, 'player:add', infos);
    
    });

  } 
  updateState(){
    if (this.currentState < 4){
       this.currentState +=1;
       //this.broadcast('shared-env', null, 'updatedState', this.states[this.currentState]);
       this.broadcast(['player', 'shared-env'], null, 'updatedState', this.states[this.currentState]);

    }
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

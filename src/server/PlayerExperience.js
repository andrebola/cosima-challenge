import { Experience } from 'soundworks/server';

// server-side 'player' experience.
export default class PlayerExperience extends Experience {
  constructor(clientType) {
    super(clientType);

    this.players = new Map();
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
      this.send(client, 'stop');
      // when the click event is received from the user we notify to all the 
      // shared-env clients
      this.broadcast('shared-env', null, 'player:add', infos);
    
    });

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

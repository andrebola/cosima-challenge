// import client side soundworks and player experience
import * as soundworks from 'soundworks/client';
import PlayerExperience from './PlayerExperience.js';
import viewTemplates from '../shared/viewTemplates';
import viewContent from '../shared/viewContent';

// list of files to load (passed to the experience)
const files = {
  welcome: 'sounds/sound-welcome.mp3',
  other: 'sounds/sound-others.mp3',
  alauda: {
    audio: 'sounds/alauda_arvensis.mp3',
    markers: 'sounds/alauda_arvensis-markers.json',
  },
  larus: {
    audio: 'sounds/larus_argentatus.mp3',
    markers: 'sounds/larus_argentatus-markers.json',
  },
  picus: {
    audio: 'sounds/picus_viridis.mp3',
    markers: 'sounds/picus_viridis-markers.json',
  },
  turdus: {
    audio: 'sounds/turdus_merula.mp3',
    markers: 'sounds/turdus_merula-markers.json',
  },
  rain: {
    audio: 'sounds/rain.mp3',
  }
};

// launch application when document is fully loaded
window.addEventListener('load', () => {
  // configuration received from the server through the `index.html`
  // @see {~/src/server/index.js}
  // @see {~/html/default.ejs}
  const { appName, clientType, socketIO, assetsDomain }  = window.soundworksConfig;
  // initialize the 'player' client
  soundworks.client.init(clientType, { appName, socketIO });
  soundworks.client.setViewContentDefinitions(viewContent);
  soundworks.client.setViewTemplateDefinitions(viewTemplates);

  // create client side (player) experience
  const experience = new PlayerExperience(assetsDomain, files);

  // start the client
  soundworks.client.start();
});

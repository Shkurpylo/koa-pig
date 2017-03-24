import speaker from './speaker.js';
import player from './player.js';
import fs from 'fs';

export {getVoicesList} from './voice.js';


export function say(speach, name) {

  const dir = __dirname + '/temp/';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return new Promise((resolve, reject) => {
    speaker(speach, dir + 'temp.mp3', name)
      .then((path) => {
        player(path);
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}

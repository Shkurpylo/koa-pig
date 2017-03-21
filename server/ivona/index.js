import ivona from './ivona.js';
import player from './player.js';
import fs from 'fs';


export default function say(speach) {

  const dir = __dirname + '/temp/';
  console.log(dir);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return new Promise((resolve, reject) => {
    ivona(speach, dir + 'temp.mp3')
      .then((path) => {
        player(path);
      })
      .then(() => {
        console.log('I say: "' + speach + '"');
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}
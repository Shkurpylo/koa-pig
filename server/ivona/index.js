import speaker from './speaker.js';
import player from './player.js';
import fs from 'fs';



export {getVoicesList} from './voice.js';


export function say(speach, name) {

  console.log('name is: ' + name);

  const dir = __dirname + '/temp/';
  console.log(dir);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return new Promise((resolve, reject) => {
    speaker(speach, dir + 'temp.mp3', name)
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

// export function voicesList() {
//   return voice()
//   .then(voices => {
//     console.log(voices);
//     return voices;})
//   .catch(err => {return err;});
// }
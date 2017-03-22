import ivona from './ivona.js';
import {
  getVoicesList
} from './voice.js';
import fs from 'fs';
import conf from '../../config.json';

function getVoiceConfig(name) {

  let defaultVoiceConfig = {
    body: {
      voice: {
        name: conf.voiceConfig.name,
        language: conf.voiceConfig.language,
        gender: conf.voiceConfig.gender
      }
    }
  };

  return new Promise((resolve, reject) => {

    if (name === '') {
      resolve(defaultVoiceConfig);
    }

    if (typeof name === 'string') {

      let voiceConfig = {};

      getVoicesList()
        .then(voicesObj => {
          voiceConfig = voicesObj.voices.find(voice => {
            console.log(voice.Name)
            return voice.Name.toLowerCase() === name.toLowerCase();
          });

          if (typeof voiceConfig.Name == 'undefined') {
            resolve(defaultVoiceConfig);
          } else {
            resolve({
              body: {
                voice: voiceConfig
              }
            });
          }
        })
        .catch(err => {
          reject(err);
        });

      console.log('fdvsvdsvds:' + JSON.stringify(voiceConfig))

    }
  });
}


export default function writeSpeach(speach, path, name) {

  let speakerName = name || '';

  return getVoiceConfig(speakerName)
    .then((voiceConfig) => {
      return new Promise(function (resolve, reject) {
        let stream = ivona
          .createVoice(speach, voiceConfig)
          .pipe(fs.createWriteStream(path.toString()), {
            autoclose: true
          });
        stream.on('finish', () => {
          resolve(path);
        });
        stream.on('err', (err) => {
          reject(err);
        });
      });
    })
    .catch(err => {
      return err;
    });
}
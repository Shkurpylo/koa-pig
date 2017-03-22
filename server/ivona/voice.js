import ivona from './ivona.js';
// import conf from '../../config.json';

export function getVoicesList() {
  return new Promise((resolve, reject) => {
    console.log('imhere')
    ivona.listVoices()
      .on('complete', (voices) => {
        resolve(voices);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
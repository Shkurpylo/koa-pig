import ivona from './ivona.js';

export function getVoicesList() {
  return new Promise((resolve, reject) => {
    ivona.listVoices()
      .on('complete', (voices) => {
        resolve(voices);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
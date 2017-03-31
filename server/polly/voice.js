import Polly from './polly.js';

export function getVoicesList() {
  return Polly.describeVoices().promise()
    .then((voiceList) => {
      return voiceList;
    })
    .catch((err) => {
      return err;
    });
}

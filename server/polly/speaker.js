import Polly from './polly.js';
import fs from 'fs';
import child_process from 'child_process';
import path from 'path';
import conf from '../../config.json';
import names from './lists/names.json';

const PATH = getPath().toString();
const namesList = names.namesList;

let textPromises = [];

export function addToQueue(text, name) {

  let voiceId = name || conf.speakerConfig.defaultVoice;
  let maxQueueLength = conf.speakerConfig.maxQueueLength || 3;

  return new Promise((resolve, reject) => {
    if (textPromises.length >= maxQueueLength) {
      return reject('queue is overflow');
    }
    if (!checkName(voiceId)) {
      return reject('wrong name');
    }

    let string = `<speak>${text}<break time='1s' /></speak>`;
    let params = {
      'Text': string,
      'OutputFormat': 'mp3',
      'VoiceId': voiceId,
      'TextType': 'ssml'
    };

    textPromises.push(Polly.synthesizeSpeech(params).promise());

    writeAudio();
  });
}

function writeAudio() {
  while (textPromises.length > 0) {
    let currentSpeach = textPromises.shift();
    currentSpeach
      .then(audio => {
        return writeFile(PATH, audio.AudioStream);
      })
      .then(() => {
        play(PATH);
      })
      .then(() => {
        deleteFile(PATH);
      })
      .catch(err => {
        throw err;
      });

  }
}

function play(what) {
  const player = conf.player || 'omxplayer';
  const options = [what.toString()];

  return child_process.execFileSync(player, options);
}

function writeFile(path, stream) {
  return new Promise((resolve, reject) => {
    if (stream instanceof Buffer) {
      try {
        fs.writeFileSync(PATH, stream);
        resolve();
      }
      catch (err) {
        reject(err);
      }
    }

  });
}

function deleteFile(path) {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

function getPath() {
  let dir = path.join(__dirname, 'temp/');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir + 'temp.mp3';
}

function checkName(name) {
  function comparator(element) {
    return element.toLowerCase() === name.toLowerCase();
  }

  return typeof namesList.find(comparator) === 'string';
}

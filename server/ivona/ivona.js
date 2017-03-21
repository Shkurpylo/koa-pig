import Ivona from 'ivona-node';
import fs from 'fs';
import conf from '../../config.json';

module.exports = function (speach, path) {
  const ivona = new Ivona({
    accessKey: conf.credentials.accessKey,
    secretKey: conf.credentials.secretKey,
  });

  const voiceConfig = {
    body: {
      voice: {
        name: conf.voiceConfig.name,
        language: conf.voiceConfig.language,
        gender: conf.voiceConfig.gender
      }
    }
  };

  function writeSpeach(speach, path) {
    return new Promise(function (resolve, reject) {
      let stream = ivona
        .createVoice(speach, voiceConfig)
        .pipe(fs.createWriteStream(path.toString()), { autoclose: true });

      stream.on('finish', () => { resolve(path); });
      stream.on('err', (err) => { reject(err); });
    });
  }

  // function deleteFile(what) {
  //   return new Promise(function (resolve, reject) {
  //     fs.unlink(what, (err) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve();
  //       }

  //     });
  //   })
  // }

  return writeSpeach(speach, path);
};




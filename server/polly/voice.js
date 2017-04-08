import Polly from './polly.js';

export function getVoicesList() {
  return Polly.describeVoices().promise()
    .then((voiceList) => {
      return voiceList.Voices;
    })
    .catch((err) => {
      return err;
    });
}

export function getUniqLanguagesList() {
  return Polly.describeVoices().promise()
    .then((voiceList) => {
      let voices = voiceList.Voices.map((voice) => {
        return {name: voice.LanguageName, code: voice.LanguageCode};
      });
      let uniqueLanguages = voices.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      return uniqueLanguages;
    })
    .catch((err) => {
      return err;
    });
}

export function getSpeakersNameList(langCode) {
  console.log('ON SRVERT' + langCode);
  let options = langCode ? {'LanguageCode': langCode} : '';
  return Polly.describeVoices(options).promise()
    .then((voiceList) => {
      let speakers = voiceList.Voices.map((voice) => {
        return {name: voice.Name, id: voice.Id, gender: voice.Gender};
      });
      return speakers;
    })
    .catch((err) => {
      return err;
    });
}


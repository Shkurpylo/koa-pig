const LANGUAGES_LOAD = '/voices/LANGUAGES_LOAD';
const LANGUAGES_LOAD_SUCCESS = '/voices/LANGUAGES_LOAD_SUCCESS';
const LANGUAGES_LOAD_FAIL = '/voices/LANGUAGES_LOAD_FAIL';
const SPEAKERS_LOAD = '/voices/SPEAKERS_LOAD';
const SPEAKERS_LOAD_SUCCESS = '/voices/SPEAKERS_LOAD_SUCCESS';
const SPEAKERS_LOAD_FAIL = '/voices/SPEAKERS_LOAD_FAIL';
const SPEACH_SEND = '/voices/SPEACH_SEND';
const SPEACH_SEND_SUCCESS = '/voices/SPEACH_SEND_SUCCESS';
const SPEACH_SEND_FAIL = '/voices/SPEACH_SEND_FAIL';

const initialState = {
  languages: [],
  languagesOnLoad: false,
  speakers: [],
  speakersOnLoads: false

};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LANGUAGES_LOAD:
      return {
        ...state,
        languagesOnLoad: true,
      };
    case LANGUAGES_LOAD_SUCCESS:
      console.log('AXCTION: ' + JSON.stringify(action));
      return {
        ...state,
        languagesOnLoad: false,
        languages: action.result
      };
    case LANGUAGES_LOAD_FAIL:
      alert('err');
      return {
        ...state,
      };
    case SPEAKERS_LOAD:
      return {
        ...state,
        speakersOnLoads: true
      };
    case SPEAKERS_LOAD_SUCCESS:
      return {
        ...state,
        speakersOnLoads: false,
        speakers: action.result
      };
    case SPEAKERS_LOAD_FAIL:
      return {
        ...state,
        speakersOnLoads: false
      };
    case SPEACH_SEND:
      return {
        ...state,
      };
    case SPEACH_SEND_SUCCESS:
      return {
        ...state,
        //TODO: add notification
      };
    case SPEACH_SEND_FAIL:
      return {
        ...state,
        //TODO: add notification
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.voices && globalState.voices.languagesOnLoad;
}

export function getLanguages() {
  console.log('in getlanguages');
  return {
    types: [LANGUAGES_LOAD, LANGUAGES_LOAD_SUCCESS, LANGUAGES_LOAD_FAIL],
    promise: (client) => client.get('/languages')
  };
}

export function getAllSpeakers() {
  console.log('in getSpeakers:');
  return {
    types: [SPEAKERS_LOAD, SPEAKERS_LOAD_SUCCESS, SPEAKERS_LOAD_FAIL],
    promise: (client) => client.get('/speakers')
  };
}

export function getSpeakersByLang(langCode) {
  let languageCode = langCode || '';
  console.log('in getSpeakers: ' + languageCode);
  return {
    types: [SPEAKERS_LOAD, SPEAKERS_LOAD_SUCCESS, SPEAKERS_LOAD_FAIL],
    promise: (client) => client.get('/speakers/' + langCode)
  };
}

export function sendSpeach(speachObj) {
  return {
    types: [SPEACH_SEND, SPEACH_SEND_SUCCESS, SPEACH_SEND_SUCCESS],
    promise: (client) => client.post('/say', {
      data: {
        text: speachObj.text,
        name: speachObj.speaker
      }
    })
  };
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import {isLoaded, getLanguages, getAllSpeakers, getSpeakersByLang, sendSpeach} from '../../redux/modules/voices';
import * as actions from '../../redux/modules/voices';
import belle from 'belle';
// import Alert from 'react-s-alert';
import 'react-select/dist/react-select.css';

const Select = require('react-select');

import './Home.css';

const TextInput = belle.TextInput;
const Button = belle.Button;

@asyncConnect([{
  deferred: false,
  promise: ({ store: { dispatch, getState } }) => {
    if (!isLoaded(getState())) {
      return dispatch(getLanguages());
    }
  }
}])
@connect(
  state => ({
    languages: state.voices.languages,
    languagesOnLoad: state.voices.languagesOnLoad,
    speakers: state.voices.speakers,
    speakersOnLoads: state.voices.speakersOnLoads,
  }), {...actions})
export class Home extends Component {
  static propTypes = {
    languages: PropTypes.array,
    languagesOnLoad: PropTypes.bool,
    speakers: PropTypes.array,
    speakersOnLoads: PropTypes.bool,
    getAllSpeakers: PropTypes.func,
    getSpeakersByLang: PropTypes.func
  };

  componentWillMount() {
    this.props.getAllSpeakers();
    this.setState({
      text: ''
    });
  }

  onTextInput = (newValue) => {
    this.setState({text: newValue});
  }

  onLanguageSet = (option) => {
    console.log(option);
    this.setState({
      lang: option
    });
    option ? this.props.getSpeakersByLang(option.value) : this.props.getAllSpeakers();
    this.setState({
      speaker: {}
    });
  }

  onSpeakerSet = (option) => {
    this.setState({
      speaker: option
    });
  }

  loadSpeakersByLang = () => {
    getSpeakersByLang(this.state.lang.toString());
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.sendSpeach({
      text: this.state.text,
      speaker: this.state.speaker ? this.state.speaker.value : ''
    });
  }

  render() {
    const {
      languages,
      languagesOnLoad,
      speakers,
      speakersOnLoads,
      getSpeakersByLang
    } = this.props;

    const valueLink = {
      value: this.state.text,
      requestChange: this.onTextInput
    };

    return (
      <div className="home">
        <div className="input-form">
          <div className="voice-options">
            <div className="lang-dropbox">
              <Select
                placeholder="select language"
                options={languages.map((lang)=> {return({value: lang.code, label: lang.name});})}
                value={this.state.lang}
                onChange={this.onLanguageSet}
              />
            </div>
            <div className="name-dropbox">
              <Select
                placeholder="select speaker"
                options={speakers.map((speaker)=> {return({value: speaker.id, label: speaker.name});})}
                value={this.state.speaker}
                isLoading={speakersOnLoads}
                onChange={this.onSpeakerSet}
              />
            </div>
          </div>
          <div className="text-field-container">
            <div className="text-field">
              <TextInput maxRows={3}
                         valueLink={valueLink}
                         placeholder="Text to speak:" 
              />
            </div>
          </div>
          <div className="button-container">
            <Button style={{padding: '8px 24px 6px'}}
                    disabled={!this.state.text || !this.state.text.length}
                    onClick={this.onSubmit}
                    >say it!</Button>
          </div>
        </div>
        <div className="history">

        </div>
      </div>
    );
  }
}
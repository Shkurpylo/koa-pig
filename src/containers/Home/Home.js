import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import {isLoaded, getLanguages, getAllSpeakers, getSpeakersByLang, sendSpeach} from '../../redux/modules/voices';
import * as actions from '../../redux/modules/voices';
import belle from 'belle';

import './Home.scss';

const TextInput = belle.TextInput;
const ComboBox = belle.ComboBox;
const Option = belle.Option;
const Button = belle.Button;

@asyncConnect([{
  deferred: false,
  promise: ({ store: { dispatch, getState } }) => {
    if (!isLoaded(getState())) {
      return dispatch(getLanguages());
    }
  }
},
{
  deferred: false,
  promise: ({ store: { dispatch, getState } }) => {
    if (!isLoaded(getState())) {
      return dispatch(getAllSpeakers());
    }
  }
}])
@connect(
  state => ({
    languages: state.voices.languages,
    languagesOnLoad: state.voices.languagesOnLoad,
    speakers: state.voices.speakers,
    speakersOnLoads: state.voices.speakersOnLoads,
    getAllSpeakers: state.voices.getAllSpeakers,
    getSpeakersByLang: state.voices.getSpeakersByLang
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

  onSubmit = (e) => {
    e.preventDefault();
    alert('it works!');
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
              {
              <ComboBox menuStyle = {{maxHeight: 300, overflowY: 'scroll'}} 
                        displayCaret={true}
                        placeholder="Choose a language"
                        onUpdate={ (event) => {
                          console.log(JSON.stringify(event));
                          event.isOptionSelection && event.identifier && getSpeakersByLang(event.identifier.toString());
                        }}
                        >
                {
                  languages.length && languages.map((language, index) => {
                    return (<Option key={index}
                                    identifier={language.code}
                                    value={language.name}>
                                    {language.name}
                            </Option>);
                  })
                }
              </ComboBox>
              }
            </div>
            <div className="name-dropbox">
              <ComboBox menuStyle = {{maxHeight: 300, overflowY: 'scroll'}} 
                        displayCaret={true}
                        disabled={ this.props.speakers.length < 1 }
                        placeholder="Choose a speaker"
                        onUpdate={ (event) => {
                          console.log(JSON.stringify(event));
                          event.isOptionSelection && getSpeakers(event.identifier.toString());
                        }}
                        >
                {
                  speakers.length && speakers.map((speaker, index) => {
                    return (<Option key={index}
                                    identifier={speaker.id}
                                    value={speaker.name}>
                                    {speaker.name}
                            </Option>);
                  })
                }
              </ComboBox>
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
import React, { Component } from 'react';
import FaBeer from 'react-icons/lib/fa/beer';
import Dropdown from 'react-toolbox/lib/dropdown';
import TimePicker from 'react-toolbox/lib/time_picker';
// import ReactUIDropdown from 'react-ui-dropdown';
import './Home.scss';

const countries = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain' },
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA' }
];


export class Home extends Component {


  render() {

    return (
      <div className="home">
        <FaBeer />
        <div className="input-form">
          <Dropdown
            auto={false}
            onChange={console.log(111)}
            source={countries}
            value={1}
          />
           <TimePicker
        label='Finishing time'
        onChange={this.handleChange}
        value={this.state.time}
      />
        </div>
        <div className="history">
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';

import MdMoreVert from 'react-icons/lib/md/more-vert';

export default class AppBar extends Component {
  render() {
    const styles = require('./AppBar.css');
    return (
      <div className="app_bar">
        <div className="logo">
          <h1>Piggy</h1>
        </div>
        <div className="menu">
          <MdMoreVert className="menu-icon"/>
        </div>
      </div >
    );
  }
}
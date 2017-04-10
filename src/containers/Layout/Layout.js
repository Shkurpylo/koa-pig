import React, { Component } from 'react';
import AppBar from '../../components/AppBar/AppBar.js';
import '../../static/global_styles.css';

export class Layout extends Component {
  render() {
    const styles = require('./Layout.css');
    return (
      <div>
        <AppBar />
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
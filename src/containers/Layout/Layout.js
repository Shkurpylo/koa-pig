import React, { Component } from 'react';
import AppBar from '../../components/AppBar/AppBar.js';
import '../../static/global_styles.scss';

export class Layout extends Component {
  render() {
    const styles = require('./Layout.scss');
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
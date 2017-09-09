import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { testFn2 } from './utils';

import index from "../style/index.less";

class Demo extends Component {
  render () {
    testFn2();
    return (
      <div className="row">{this.props.text}</div>
    );
  }
}


ReactDOM.render(
  <Demo text="This is a React test." />,
  document.querySelector('.container')
);

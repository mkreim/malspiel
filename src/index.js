//******************************************************************************
//       Filename:  index.js
//    Description:  MalSpiel https://github.com/mkreim/malspiel
//        Created:  Thu Sep 14 18:50:04 2017
//         Author:  (2017), Dr. Michael Kreim https://github.com/mkreim
//*****************************************************************************/
import React from 'react';
import ReactDOM from 'react-dom';
import 'tachyons/css/tachyons.css';
import './index.css';
import Toolbar from './components/toolbar';
import Canvas from './components/canvas';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: 25,
      cols: 40,
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000'],
      matrix: Array(25)
        .fill(null)
        .map(x => Array(40).fill('#fff')),
      currColor: '#00ff00',
      lastSaved: null,
    };
    this.changeColor = this.changeColor.bind(this);
    this.paintCanvasButton = this.paintCanvasButton.bind(this);
    this.saveState = this.saveState.bind(this);
    this.loadState = this.loadState.bind(this);
  }

  changeColor(color) {
    this.setState({ currColor: color });
  }

  paintCanvasButton(row, col) {
    const matrix = [...this.state.matrix];
    matrix[row][col] = this.state.currColor;
    this.setState({ matrix: matrix });
  }

  saveState() {
    this.setState({ lastSaved: new Date() });
    localStorage.setItem('malspiel', JSON.stringify(this.state));
  }

  loadState() {
    this.setState(JSON.parse(localStorage.getItem('malspiel')));
  }

  render() {
    return (
      <div className="app">
        <Canvas
          currColor={this.state.currColor}
          matrix={this.state.matrix}
          onClick={this.paintCanvasButton}
        />
        <Toolbar
          colors={this.state.colors}
          currColor={this.state.currColor}
          onClick={color => this.changeColor(color)}
          loadState={this.loadState}
          saveState={this.saveState}
          lastSaved={this.state.lastSaved}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
// --- EOF ---------------------------------------------------------------------

//******************************************************************************
//       Filename:  index.js
//    Description:  MalSpiel
//        Created:  Thu Sep 14 18:50:04 2017
//         Author:  (2017), Dr. Michael Kreim michael@perfect-kreim.de
//*****************************************************************************/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//const state = {'buttons': [1,2,3,4], 'bla': {a:4}}
//localStorage.setItem('meinbild', JSON.stringify(state))
//JSON.parse(localStorage.getItem('meinbild'))

function CanvasButton(props)
{
    const color = props.matrix[props.row, props.col]
    return(
            <button
                className="canvasButton"
                style={{background: color}}
                onClick={props.onClick}
                >
            </button>
    );
}

//class CanvasRow extends React.Component
//{
    //render()
    //{
        //let buttons = [];
        //for(let c=0; c<this.props.cols; c++)
        //{
            //buttons.push( <CanvasButton currColor={this.props.currColor} /> );
        //}
        //return( <div className="canvasRow"> {buttons} </div> );
    //}
//}

class Canvas extends React.Component
{
    render()
    {
        let rowElements = [];
        for(let r=0; r<this.props.rows; r++)
        {
            rowElements.push( <CanvasRow
                                cols={this.props.cols}
                                currColor={this.props.currColor}
                             /> );
        }
        return( <div className="canvas"> {rowElements} </div> );
    }
}

class ButtonBar extends React.Component
{
    render()
    {
        return(
            <div className="buttonBar">
                {this.props.colors.map(
                    color => <button
                                className="colorButton"
                                style={{background: color}}
                                onClick={() => this.props.onClick(color)} >
                            </button>
                )}
            </div>
        );
    }
}


class Toolbar extends React.Component
{
    render()
    {
        return(
            <div className="toolbar">
                <div className="currColor"
                    style={{background: this.props.currColor}} >
                </div>
                <ButtonBar
                    colors={this.props.colors}
                    onClick={(color) => this.props.onClick(color)}
                />
            </div>
        );
    }
}


class App extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            rows: 25,
            cols: 40,
            colors: [
                '#ff0000',
                '#00ff00',
                '#0000ff',
                '#ffff00',
                '#ff00ff',
                '#00ffff',
                '#000000',
                ],
            matrix: Array(25).fill(null).map(x => Array(40).fill("#fff")),
            currColor: '#00ff00',
        };
    }

    changeColor(color)
    {
        this.setState({currColor: color,});
    }

    paintCanvasButton(row, col, color)
    {
        const matrix = this.state.matrix;
        matrix[row, col] = color;
        this.setState({ matrix: matrix });
    }

    render()
    {
        return(
            <div className="app">
                    <Canvas
                        currColor={this.state.currColor}
                        matrix={this.state.matrix}
                        onClick={(row,col) => this.paintCanvasButton(row, col)}
                        />
                    <Toolbar
                        colors={this.state.colors}
                        currColor={this.state.currColor}
                        onClick={(color) => this.changeColor(color)}
                        />
            </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// --- EOF ---------------------------------------------------------------------

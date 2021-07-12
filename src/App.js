import React, { useState, memo, useCallback } from 'react';
import 'tachyons/css/tachyons.css';
import Toolbar from './components/toolbar';
import Canvas from './components/canvas';

const colors = [
  '#000000',
  '#808080',
  '#C0C0C0',
  '#800000',
  '#FF0000',
  '#808000',
  '#FFFF00',
  '#008000',
  '#00FF00',
  '#008080',
  '#00FFFF',
  '#000080',
  '#0000FF',
  '#800080',
  '#FF00FF',
  '#FFFFFF',
];

function getMatrix() {
  const width = window.innerWidth - 240;
  const height = window.innerHeight;
  const buttonSize = 34;

  const cols = Math.floor(width / buttonSize);
  const rows = Math.floor(height / buttonSize);
  console.log({ width, height, cols, rows });

  return Array(rows)
    .fill(null)
    .map((x) => Array(cols).fill('#fff'));
}

function getListOfSavePoints() {
  return Object.keys(localStorage)
    .filter((v) => v.startsWith('malspiel_'))
    .sort()
    .reverse();
}

function App() {
  const [matrix, setMatrix] = useState(getMatrix());
  const [currColor, changeColor] = useState('#00ff00');
  const [savePoints, setSavePoints] = useState(getListOfSavePoints());

  const paintCanvasButton = useCallback(
    (row, col) => {
      const newMatrix = [...matrix];
      newMatrix[row][col] = currColor;
      setMatrix(newMatrix);
    },
    [matrix, currColor]
  );

  const saveState = useCallback(() => {
    const saveName = `malspiel_${new Date().toISOString()}`;
    localStorage.setItem(saveName, JSON.stringify({ matrix, currColor }));
    setSavePoints(getListOfSavePoints());
  }, [matrix, currColor]);

  const loadState = useCallback((saveName) => {
    const { matrix: newMatrix, currColor: newColor } = JSON.parse(localStorage.getItem(saveName));
    setMatrix(newMatrix);
    changeColor(newColor);
  }, []);

  return (
    <>
      <div className="app">
        <Canvas currColor={currColor} matrix={matrix} onClick={paintCanvasButton} />
        <Toolbar
          colors={colors}
          currColor={currColor}
          onClick={changeColor}
          loadState={loadState}
          saveState={saveState}
          savePoints={savePoints}
        />
      </div>
      <footer>
        <a href="http://www.perfect-kreim.de/impressum.html">impressum</a>
      </footer>
    </>
  );
}

export default memo(App);

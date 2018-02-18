import React from 'react';

const CanvasButton = ({ color, onClick }) => (
  <button className="canvasButton pointer" style={{ background: color }} onClick={onClick} />
);

const Canvas = ({ matrix, onClick }) => (
  <div className="canvas">
    {matrix.map((row, rowIndex) => (
      <div key={`row-${rowIndex}`} className="canvasRow">
        {row.map((color, colIndex) => (
          <CanvasButton
            key={`col-${colIndex}`}
            color={color}
            onClick={() => onClick(rowIndex, colIndex)}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Canvas;

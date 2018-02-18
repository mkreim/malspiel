import React from 'react';

const LoadIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      fill="gray"
      d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14M12,9L7,14H10V18H14V14H17L12,9Z"
    />
  </svg>
);
const SaveIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      fill="gray"
      d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14M12,19L17,14H14V10H10V14H7L12,19Z"
    />
  </svg>
);

const ButtonBar = ({ colors, onClick }) => (
  <div>
    {colors.map((color, index) => (
      <button
        key={`color-button-${index}`}
        className="colorButton pointer"
        style={{ background: color }}
        onClick={() => onClick(color)}
      />
    ))}
  </div>
);

const Toolbar = ({ currColor, colors, onClick, loadState, saveState, lastSaved }) => (
  <div className="toolbar">
    <div className="currColor" style={{ background: currColor }} />
    <ButtonBar colors={colors} onClick={color => onClick(color)} />
    <div className="flex-none db tc mt6">
      <div onClick={loadState} className="pointer ph4">
        <LoadIcon />
      </div>
      <div onClick={saveState} className="pointer ph4">
        <SaveIcon />
      </div>
      <div className="mt2 gray tc">
        {lastSaved ? lastSaved.toLocaleString() : 'noch nicht gespeichert!'}
      </div>
    </div>
  </div>
);

export default Toolbar;

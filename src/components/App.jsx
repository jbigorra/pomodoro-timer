import React from 'react';
import { Timer } from './Timer';

function Title () {
  return (
    <div className="title pure-g">
      <div className="pure-u-1">
        <h1>Pomodoro Timer</h1>
      </div>
    </div>
  );
}

export default function App () {
  return (
    <div className="main">
      <Title />
      <Timer />
    </div>
  );
}

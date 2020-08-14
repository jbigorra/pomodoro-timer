import React, { useState } from 'react';
import { secToMin, printMinutesFrom } from '../lib/TimerLib';
import { useInterval } from '../hooks/useInterval';
import './Timer.scss';
import PlayIconImage from './PlayIcon.svg';
import PauseIconImage from './PauseIcon.svg';

const defaultWorkTime = 1500;

const workTimes = [
  { seconds: 2700 },
  { seconds: 2400 },
  { seconds: 2100 },
  { seconds: 1800 },
  { seconds: 1500 },
  { seconds: 1200 },
  { seconds: 900 },
  { seconds: 5 }
];

const defaultBreakTime = 600;

const breakTimes = [
  { seconds: 1500 },
  { seconds: 1200 },
  { seconds: 900 },
  { seconds: 600 },
  { seconds: 5 }
];

export function Timer () {
  const [isOn, setStatus] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [workTime, setWorkTime] = useState(defaultWorkTime);
  const [breakTime, setBreakTime] = useState(defaultBreakTime);

  useInterval(() => {
    if (secondsLeft <= 0) {
      timeIsUp();
      return;
    }

    setSecondsLeft(t => t - 1);
  }, isOn ? 1000 : null);

  function timeIsUp () {
    reloadSettings();
    alert("Hey, it's time to take a break!");
  }

  function toggleTimer () {
    setStatus(!isOn);
  }

  function reloadSettings () {
    setSecondsLeft(workTime);
    setStatus(false);
  }

  function selectWorkTime (e) {
    setWorkTime(e.target.value);
  }

  function selectBreakTime (e) {
    setBreakTime(e.target.value);
  }
  return (
    <div className="timer pure-g">
      <TimerSettings {...{ selectWorkTime, selectBreakTime, reloadSettings }}/>
      <Countdown {...{ isOn, toggleTimer, secondsLeft }} />
    </div>
  );
}

function TimerSettings ({ selectWorkTime, selectBreakTime, reloadSettings }) {
  return (
    <div className="timer__settings pure-u-1">
      <div className="pure-g">
        <div className="pure-u-1-2">
          <div className="pure-g">
            <div className="timer__settings-work-time pure-u-1 pure-u-sm-1-2">
              <label className="timer__settings__label" htmlFor="work-time">Work Time</label>
              <select id="work-times" name="worktime" onChange={selectWorkTime} defaultValue={defaultWorkTime}>
                {workTimes.map(opt => (
                  <option key={opt.seconds} value={opt.seconds}>{`${secToMin(opt.seconds)} minutes`}</option>
                ))}
              </select>
            </div>
            <div className="timer__settings-break-time pure-u-1 pure-u-sm-1-2">
              <label className="timer__settings__label" htmlFor="break-time">Break Time</label>
              <select id="break-times" name="breaktime" onChange={selectBreakTime} defaultValue={defaultBreakTime}>
                {breakTimes.map(opt => (
                  <option key={opt.seconds} value={opt.seconds}>{`${secToMin(opt.seconds)} minutes`}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="timer__settings__load pure-u-1-2">
          <button className="timer__settings__load__button" onClick={reloadSettings}>Load Settings</button>
        </div>
      </div>
    </div>
  );
}

function Countdown ({ secondsLeft, isOn, toggleTimer }) {
  return (
    <div className="timer__time pure-u-1">
      <div className="timer__time__display" onClick={toggleTimer}>
        { isOn
          ? (
            <>
              <p className="timer_time__display__Text">{printMinutesFrom(secondsLeft)}</p>
              <PauseIcon />
            </>
          )
          : <PlayIcon />
        }
      </div>
    </div>
  );
}

function PlayIcon () {
  return (
    <img className="timer__play-button" src={PlayIconImage} />
  );
}

function PauseIcon () {
  return (
    <img className="timer__pause-button" src={PauseIconImage} />
  );
}

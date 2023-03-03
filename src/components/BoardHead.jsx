import React from 'react';
import PropTypes from 'prop-types';

import niceBoy from '../assets/niceBoy.svg';
import niceBoy_clicked from '../assets/niceBoy_clicked.svg';
import sadBoy from '../assets/sadBoy.svg';
import wowBoy from '../assets/wowBoy.svg';
import coolBoy from '../assets/coolBoy.svg';

import zero from '../assets/0.svg';
import one from '../assets/1.svg';
import two from '../assets/2.svg';
import three from '../assets/3.svg';
import four from '../assets/4.svg';
import five from '../assets/5.svg';
import six from '../assets/6.svg';
import seven from '../assets/7.svg';
import eight from '../assets/8.svg';
import nine from '../assets/9.svg';

const BoardHead = (props) => {
  const arrOfNums = [zero, one, two, three, four, five, six, seven, eight, nine];

  let status;
  if (props.status === 'running' || props.status === 'waiting') {
    status = <img src={niceBoy} alt="game" />;
  } else if (props.status === 'wow') {
    status = <img src={wowBoy} alt="look" />;
  } else if (props.status === 'winner') {
    status = <img src={coolBoy} alt="winner" />;
  } else {
    status = <img src={sadBoy} alt="you lose" />;
  }

  const showNumbers = (data) => {
    let currentFlags = props.flagsUsed;
    let currentTime = props.time;
    let currentArgument = data === 'flags' ? currentFlags : currentTime;
    let units, dozens, hundreds;

    arrOfNums.map((num, index) => {
      if (index === currentArgument % 10) {
        units = num;
      }
    });

    arrOfNums.map((num, index) => {
      if (index === Math.floor(currentArgument / 10)) {
        dozens = num;
      }
    });

    arrOfNums.map((num, index) => {
      if (index === Math.floor(currentArgument / 100)) {
        hundreds = num;
      }
    });

    currentFlags = (
      <>
        <img src={hundreds} alt="" />
        <img src={dozens} alt="" />
        <img src={units} alt="" />
      </>
    );
    return currentFlags;
  };

  return (
    <div className="board-head">
      <div className="flag-count">{showNumbers('flags')}</div>
      <button className="reset" onClick={props.reset}>
        {status}
      </button>
      <div className="timer">{showNumbers('time')}</div>
    </div>
  );
};

export default BoardHead;

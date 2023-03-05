import React from 'react';

import bomb_1 from '../assets/bomb_1.svg';
import bomb_2 from '../assets/bomb_2.svg';
import bomb_3 from '../assets/bomb_3.svg';
import bomb_4 from '../assets/bomb_4.svg';
import bomb_5 from '../assets/bomb_5.svg';
import bomb_6 from '../assets/bomb_6.svg';
import bomb_7 from '../assets/bomb_7.svg';
import bomb_8 from '../assets/bomb_8.svg';

import bomb_crossed from '../assets/bomb_crossed.svg';
import bomb_gray from '../assets/bomb_gray.svg';
import bomb_red from '../assets/bomb_red.svg';

import coveredCell from '../assets/coveredCell.svg';
import emptyCell from '../assets/emptyCell.svg';
import flag from '../assets/flag.svg';
import question from '../assets/question.svg';
import question_clicked from '../assets/question_clicked.svg';

const Cell = (props) => {
  const numOfMinesAround = (props) => {
    switch (props.data.count) {
      case 1:
        return <img src={bomb_1} />;
      case 2:
        return <img src={bomb_2} />;
      case 3:
        return <img src={bomb_3} />;
      case 4:
        return <img src={bomb_4} />;
      case 5:
        return <img src={bomb_5} />;
      case 6:
        return <img src={bomb_6} />;
      case 7:
        return <img src={bomb_7} />;
      case 8:
        return <img src={bomb_8} />;
    }
  };

  let cell = () => {
    if (props.data.isOpen) {
      if (props.data.hasMine) {
        if (props.data.isRed) {
          return (
            <div
              className="cell"
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              onClick={() => props.open(props.data)}>
              <img src={bomb_red} alt="" />
            </div>
          );
        }

        return (
          <div
            className="cell"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
            onClick={() => props.open(props.data)}>
            <img src={bomb_gray} alt="" />
          </div>
        );
      } else if (props.data.count === 0) {
        return (
          <div
            className="cell"
            onContextMenu={(e) => {
              e.preventDefault();
              props.flag(props.data);
            }}
            onClick={() => props.open(props.data)}>
            <img src={emptyCell} alt="" />
          </div>
        );
      } else {
        return (
          <div
            className="cell"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
            onClick={() => props.open(props.data)}>
            {numOfMinesAround(props)}
          </div>
        );
      }
    } else if (props.data.hasFlag) {
      return (
        <div
          className="cell"
          onContextMenu={(e) => {
            e.preventDefault();
            props.flag(props.data);
          }}
          onClick={() => props.open(props.data)}>
          <img src={flag} alt="" />
        </div>
      );
    } else if (props.data.hasQuestion) {
      return (
        <div
          className="cell"
          onContextMenu={(e) => {
            e.preventDefault();
            props.flag(props.data);
          }}
          onClick={() => props.open(props.data)}>
          <img src={question} alt="" />
        </div>
      );
    } else {
      return (
        <div
          className="cell"
          onContextMenu={(e) => {
            e.preventDefault();
            props.flag(props.data);
          }}
          onClick={() => props.open(props.data)}>
          <img src={coveredCell} alt="" />
        </div>
      );
    }
  };
  return cell();
};

export default Cell;

import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';
import Stopwatch from '../stopwatch';

export default class Task extends Component {
  state = {
    timeAgo: formatDistanceToNow(this.props.createTime, { includeSeconds: true }),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ timeAgo: formatDistanceToNow(this.props.createTime, { includeSeconds: true }) });
  }

  render() {
    const { text, doneToggle, onDeleted, editingBtn, checked, stopwatchTime, updateStopwatchTime } = this.props;
    const { timeAgo } = this.state;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={checked} onChange={doneToggle} />
        <label>
          <span className="title">{text}</span>
          <Stopwatch stopwatchTime={stopwatchTime} updateStopwatchTime={updateStopwatchTime} />
          <span className="description">created {timeAgo}</span>
        </label>
        <button className="icon icon-edit" onClick={editingBtn}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
  state = {
    createTime: new Date().getTime(),
    timeAgo: ' less than 1 seconds',
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(({ createTime }) => {
      return {
        timeAgo: formatDistanceToNow(createTime, { includeSeconds: true }),
      };
    });
  }

  render() {
    const { text, onDeleted, doneToggle, editingBtn } = this.props;
    const { timeAgo } = this.state;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={doneToggle} />
        <label>
          <span className="description">{text}</span>
          <span className="created">created {timeAgo} </span>
        </label>
        <button className="icon icon-edit" onClick={editingBtn}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}

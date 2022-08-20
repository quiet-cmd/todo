import React, { Component } from 'react';
import { format } from 'date-fns';
import './stopwatch.css';

export default class Stopwatch extends Component {
  state = {
    timer: 0,
  };

  componentDidMount() {
    this.setState({ timer: this.props.stopwatchTime });
  }

  componentWillUnmount() {
    this.props.updateStopwatchTime(this.state.timer);
    clearInterval(this.timerID);
  }

  timerStart = () => {
    clearInterval(this.timerID);
    this.timerID = setInterval(() => this.setState({ timer: this.state.timer + 1000 }), 1000);
  };

  timerStop = () => {
    clearInterval(this.timerID);
  };

  timeFormat(time) {
    const timestamp = new Date(1995, 11, 17, 0, 0, 0).getTime();
    const date = new Date(timestamp + time);
    return format(date, 'HH:mm:ss');
  }

  render() {
    return (
      <span className="description">
        <button className="icon icon-play" value={true} onClick={this.timerStart} />
        <button className="icon icon-pause" value={false} onClick={this.timerStop} />
        {this.timeFormat(this.state.timer)}
      </span>
    );
  }
}

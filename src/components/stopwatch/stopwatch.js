import React, { Component } from 'react';
import { format } from 'date-fns';
import './stopwatch.css';

export default class Stopwatch extends Component {
  state = {
    timer: 0,
    player: false,
  };

  componentDidMount() {
    const { stopwatchTime, playerState } = this.props;
    if (playerState) {
      const time = new Date() - stopwatchTime;
      this.setState({ timer: time });
      this.timerStart();
      return;
    }
    this.setState({ timer: stopwatchTime });
  }

  componentWillUnmount() {
    const { timer, player } = this.state;
    clearInterval(this.timerID);
    if (player) return this.props.updateStopwatchTime(new Date() - timer, player);
    this.props.updateStopwatchTime(timer, player);
  }

  timerStart = () => {
    this.setState({ player: true });
    clearInterval(this.timerID);
    this.timerID = setInterval(() => this.setState({ timer: this.state.timer + 1000 }), 1000);
  };

  timerStop = () => {
    this.setState({ player: false });
    clearInterval(this.timerID);
  };

  timeFormat(time) {
    const timestamp = new Date(1995, 11, 17, 0, 0, 0).getTime();
    if (time >= 86399000) {
      time = time % 86399000;
      this.setState({ timer: time });
    }
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

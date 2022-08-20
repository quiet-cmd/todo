import React, { Component } from 'react';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    value: '',
    minutes: '',
    seconds: '',
  };

  inputTask = (e) => {
    this.setState({ value: e.target.value });
  };

  inputMinutes = (e) => {
    this.setState({ minutes: e.target.value });
  };

  inputSeconds = (e) => {
    this.setState({ seconds: e.target.value });
  };

  inputInter = (e) => {
    if (e.key === 'Enter') {
      const { value, minutes, seconds } = this.state;
      this.props.addItem(value, minutes || 0, seconds || 0);
      this.setState({ value: '', minutes: '', seconds: '' });
    }
  };

  render() {
    return (
      <form className="new-todo-form" onKeyPress={this.inputInter}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.value}
          onChange={this.inputTask}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.minutes}
          onChange={this.inputMinutes}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.seconds}
          onChange={this.inputSeconds}
        />
      </form>
    );
  }
}

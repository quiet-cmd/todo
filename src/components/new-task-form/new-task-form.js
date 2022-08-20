import React, { Component } from 'react';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    value: '',
    minutes: '',
    seconds: '',
  };

  validator = (text) => {
    return text.replace('-', '').replace('.', '').slice(0, 3);
  };

  inputTask = (e) => {
    this.setState({ value: e.target.value });
  };

  inputMinutes = (e) => {
    const val = this.validator(e.target.value);
    this.setState({ minutes: val });
  };

  inputSeconds = (e) => {
    const val = this.validator(e.target.value);
    this.setState({ seconds: val });
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

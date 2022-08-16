import React, { Component } from 'react';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    value: '',
  };

  inputTask = (e) => {
    this.setState({ value: e.target.value });
  };

  inputInter = (e) => {
    if (e.key === 'Enter') {
      this.props.addItem(this.state.value);
      this.setState({ value: '' });
    }
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={this.state.value}
        onChange={this.inputTask}
        onKeyPress={this.inputInter}
      />
    );
  }
}

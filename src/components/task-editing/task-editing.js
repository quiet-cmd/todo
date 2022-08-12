import React, { Component } from 'react';

import './task-editing.css';

export default class TaskEditing extends Component {
  state = {
    value: 'Editing task',
  };

  inputTask = (e) => {
    this.setState(() => {
      return { value: e.target.value };
    });
  };

  inputInter = (e) => {
    if (e.key === 'Enter') {
      this.setState(() => {
        this.props.editingText(this.state.value);
        return { value: '' };
      });
    }
  };

  render() {
    return <input type="text" className="edit" value={this.state.value} onChange={this.inputTask} onKeyPress={this.inputInter} />;
  }
}

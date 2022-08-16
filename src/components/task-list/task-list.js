import React, { Component } from 'react';

import Task from '../task';
import TaskEditing from '../task-editing';

import './task-list.css';

export default class TaskList extends Component {
  switchStatus = (e, id, fn, status) => {
    const target = e.target.localName;
    if (target !== 'input' && target !== 'button' && e.currentTarget.className !== status) fn(id);
  };

  render() {
    const {
      tasks,
      statuses: { editing },
      onDeleted,
      doneToggle,
      editingBtn,
      editingText,
    } = this.props;

    const task = tasks.map(({ id, status, ...par }) => {
      return (
        <li
          key={id}
          className={status.toString()}
          onClickCapture={(e) => this.switchStatus(e, id, doneToggle, editing)}
        >
          <Task
            {...par}
            onDeleted={() => onDeleted(id)}
            editingBtn={() => editingBtn(id)}
            doneToggle={() => doneToggle(id)}
          />
          {status === editing && <TaskEditing editingText={(text) => editingText(id, text)} />}
        </li>
      );
    });

    return <ul className="todo-list">{task}</ul>;
  }
}

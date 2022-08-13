import React, { Component } from 'react';

import Task from '../task';
import TaskEditing from '../task-editing';

import './task-list.css';

export default class TaskList extends Component {
  hello = (e, id, fn) => {
    const checkbox = e.currentTarget.querySelector('.toggle');
    checkbox.checked = checkbox.checked ? false : true;
    fn(id);
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
        <li key={id} className={status.toString()} onClick={(e) => this.hello(e, id, doneToggle)}>
          <Task {...par} onDeleted={() => onDeleted(id)} editingBtn={() => editingBtn(id)} />
          {status === editing && <TaskEditing editingText={(text) => editingText(id, text)} />}
        </li>
      );
    });

    return <ul className="todo-list">{task}</ul>;
  }
}

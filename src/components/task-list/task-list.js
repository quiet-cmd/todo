import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task';
import TaskEditing from '../task-editing';

import './task-list.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onDeleted, doneToggle, editingBtn, editingText } = this.props;

    const task = tasks.map(({ id, status, ...par }) => {
      return (
        <li key={id} className={status.toString()}>
          <Task
            {...par}
            status={status}
            onDeleted={() => onDeleted(id)}
            doneToggle={() => doneToggle(id)}
            editingBtn={() => editingBtn(id)}
          />
          {status === 'editing' && <TaskEditing editingText={(text) => editingText(id, text)} />}
        </li>
      );
    });

    return <ul className="todo-list">{task}</ul>;
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      status: PropTypes.oneOf(['', 'completed', 'editing']),
      text: PropTypes.string,
      createTime: PropTypes.number,
    })
  ),
};

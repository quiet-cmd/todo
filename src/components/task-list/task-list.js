import React from 'react';

import Task from '../task';
import TaskEditing from '../task-editing';

import './task-list.css';

const TaskList = ({ tasks, editing, doneToggle }) => {
  const switchStatus = (e, id, fn, status) => {
    const targetName = e.target.localName;
    const typeExp = targetName !== 'input' && targetName !== 'button';
    if (typeExp && e.currentTarget.className !== status) fn(id);
  };

  const task = tasks.map(({ id, status, ...par }) => {
    return (
      <li key={id} className={status} onClickCapture={(e) => switchStatus(e, id, doneToggle, editing)}>
        <Task {...par} id={id} doneToggle={() => doneToggle(id)} />
        {status === editing && <TaskEditing id={id} />}
      </li>
    );
  });

  return <ul className="todo-list">{task}</ul>;
};

export default TaskList;

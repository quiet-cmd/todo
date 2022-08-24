import React from 'react';

import Task from '../task';
import TaskEditing from '../task-editing';

import './task-list.css';

const TaskList = ({
  tasks,
  statuses: { editing },
  onDeleted,
  doneToggle,
  editingBtn,
  editingText,
  updateStopwatchTime,
}) => {
  const switchStatus = (e, id, fn, status) => {
    const targetName = e.target.localName;
    const typeExp = targetName !== 'input' && targetName !== 'button';
    if (typeExp && e.currentTarget.className !== status) fn(id);
  };

  const task = tasks.map(({ id, status, ...par }) => {
    return (
      <li key={id} className={status} onClickCapture={(e) => switchStatus(e, id, doneToggle, editing)}>
        <Task
          {...par}
          updateStopwatchTime={(time, playerState) => updateStopwatchTime(id, time, playerState)}
          onDeleted={() => onDeleted(id)}
          editingBtn={() => editingBtn(id)}
          doneToggle={() => doneToggle(id)}
        />
        {status === editing && <TaskEditing editingText={(text) => editingText(id, text)} />}
      </li>
    );
  });

  return <ul className="todo-list">{task}</ul>;
};

export default TaskList;

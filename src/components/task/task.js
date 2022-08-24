import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';
import Stopwatch from '../stopwatch';

const Task = ({ text, doneToggle, onDeleted, editingBtn, checked, createTime, ...props }) => {
  const [timeAgo, setTime] = useState(formatDistanceToNow(createTime, { includeSeconds: true }));
  const [timerID, setTimerID] = useState();

  useEffect(() => {
    setTimerID(
      setInterval(() => {
        setTime(formatDistanceToNow(createTime, { includeSeconds: true }));
      }, 1000)
    );
    return () => clearInterval(timerID);
  }, []);

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={checked} onChange={doneToggle} />
      <label>
        <span className="title">{text}</span>
        <Stopwatch {...props} />
        <span className="description">created {timeAgo}</span>
      </label>
      <button className="icon icon-edit" onClick={editingBtn}></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );
};

export default Task;

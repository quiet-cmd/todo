import React, { useState, useEffect, useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { Context } from '../context';
import './task.css';
import Stopwatch from '../stopwatch';

const Task = ({ text, toggleProgressStatus, checked, createTime, id, ...props }) => {
  const [timeAgo, setTime] = useState(formatDistanceToNow(createTime, { includeSeconds: true }));
  const { setEditingStatus, deleteItem } = useContext(Context);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(formatDistanceToNow(createTime, { includeSeconds: true }));
    }, 1000);
    return () => clearInterval(timerID);
  }, []);

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={checked} onChange={toggleProgressStatus} />
      <label>
        <span className="title">{text}</span>
        <Stopwatch id={id} {...props} />
        <span className="description">created {timeAgo}</span>
      </label>
      <button className="icon icon-edit" onClick={() => setEditingStatus(id)}></button>
      <button className="icon icon-destroy" onClick={() => deleteItem(id)}></button>
    </div>
  );
};

export default Task;

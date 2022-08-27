import React, { useState, useContext } from 'react';

import { Context } from '../context';

import './task-editing.css';

const TaskEditing = ({ id }) => {
  const [value, setValue] = useState('Editing task');
  const { setNewText } = useContext(Context);

  const inputTask = (e) => setValue(e.target.value);

  const inputInter = (e) => {
    if (e.key === 'Enter') setNewText(id, value);
  };

  return <input type="text" className="edit" value={value} onChange={inputTask} onKeyPress={inputInter} />;
};

export default TaskEditing;

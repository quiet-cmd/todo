import React, { useState } from 'react';

import './task-editing.css';

const TaskEditing = ({ editingText }) => {
  const [value, setValue] = useState('Editing task');

  const inputTask = (e) => setValue(e.target.value);

  const inputInter = (e) => {
    if (e.key === 'Enter') editingText(value);
  };

  return <input type="text" className="edit" value={value} onChange={inputTask} onKeyPress={inputInter} />;
};

export default TaskEditing;

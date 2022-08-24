import React, { useContext, useState } from 'react';

import { Context } from '../context';

import './new-task-form.css';

const NewTaskForm = () => {
  const [inputState, setInputState] = useState({
    value: '',
    minutes: '',
    seconds: '',
  });
  const { addItem } = useContext(Context);

  const validator = (text) => {
    return text.replace('-', '').replace('.', '').slice(0, 3);
  };

  const inputTask = (e) => {
    setInputState({ ...inputState, value: e.target.value });
  };

  const inputMinutes = (e) => {
    const val = validator(e.target.value);
    setInputState({ ...inputState, minutes: val });
  };

  const inputSeconds = (e) => {
    const val = validator(e.target.value);
    setInputState({ ...inputState, seconds: val });
  };

  const inputInter = (e) => {
    if (e.key === 'Enter') {
      const { value, minutes, seconds } = inputState;
      addItem(value, minutes || 0, seconds || 0);
      setInputState({ value: '', minutes: '', seconds: '' });
    }
  };

  return (
    <form className="new-todo-form" onKeyPress={inputInter}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={inputState.value}
        onChange={inputTask}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={inputState.minutes}
        onChange={inputMinutes}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={inputState.seconds}
        onChange={inputSeconds}
      />
    </form>
  );
};

export default NewTaskForm;

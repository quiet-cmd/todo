import React, { useContext } from 'react';

import { Context } from '../context';

import './tasks-filter.css';

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'uncompleted', label: 'Active' },
  { name: 'completed', label: 'Completed' },
];

const TasksFilter = ({ filter }) => {
  const { changeFilter } = useContext(Context);
  const btn = filterButtons.map(({ name, label }) => {
    const selected = filter === name ? 'selected' : '';
    return (
      <li key={name}>
        <button className={selected} onClick={() => changeFilter(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{btn}</ul>;
};

export default TasksFilter;

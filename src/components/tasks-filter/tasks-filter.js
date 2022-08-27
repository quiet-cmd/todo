import React, { useContext } from 'react';

import { Context } from '../context';

import './tasks-filter.css';

const TasksFilter = ({ filter }) => {
  const {
    changeFilter,
    statuses: { all, uncompleted, completed },
  } = useContext(Context);

  const filterButtons = [
    { name: all, label: 'All' },
    { name: uncompleted, label: 'Active' },
    { name: completed, label: 'Completed' },
  ];

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

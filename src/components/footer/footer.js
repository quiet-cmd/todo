import React from 'react';

import TasksFilter from '../tasks-filter';

import './footer.css';

const Footer = ({ sizeUncompleted, deleteCompleted, filter, changeFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{sizeUncompleted} items left</span>
      <TasksFilter filter={filter} changeFilter={changeFilter} />
      <button className="clear-completed" onClick={(text) => deleteCompleted(text)}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;

import React, { useContext } from 'react';

import { Context } from '../context';
import TasksFilter from '../tasks-filter';

import './footer.css';

const Footer = ({ sizeUncompleted, filter }) => {
  const { deleteCompleted } = useContext(Context);
  return (
    <footer className="footer">
      <span className="todo-count">{sizeUncompleted} items left</span>
      <TasksFilter filter={filter} />
      <button className="clear-completed" onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;

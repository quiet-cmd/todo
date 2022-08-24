import React, { useState } from 'react';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';
import { Context } from '../context';

import './app.css';

const App = () => {
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState([]);
  const statuses = {
    completed: 'completed',
    editing: 'editing',
    uncompleted: 'uncompleted',
  };

  const deleteItem = (id) => {
    setTasks(tasks.filter(({ id: el }) => el !== id));
  };

  const addItem = (value, minutes, seconds) => {
    const { uncompleted } = statuses;
    const item = {
      id: maxId++,
      status: uncompleted,
      prevStatus: uncompleted,
      text: value,
      createTime: new Date().getTime(),
      checked: false,
      stopwatchTime: minutes * 60 * 1000 + seconds * 1000,
      playerState: false,
    };
    setTasks(() => [...tasks, item]);
  };

  const deleteCompleted = () => {
    const { completed } = statuses;
    setTasks(tasks.filter(({ status }) => status !== completed));
  };

  const changeFilter = (filter) => {
    setFilter(filter);
  };

  const filterItems = (items, filter, filters) => {
    const { completed, uncompleted } = filters;
    if (filter === 'all') return items;
    if (filter === 'uncompleted') return items.filter(({ status }) => status === uncompleted);
    if (filter === 'completed') return items.filter(({ status }) => status === completed);
  };

  const doneToggle = (id) => {
    const { completed, uncompleted } = statuses;
    setTasks(() =>
      tasks.map((el) => {
        let { status, checked } = el;
        if (id === el.id) {
          el.status = status === completed ? uncompleted : completed;
          el.checked = !checked;
        }
        return el;
      })
    );
  };

  const editingBtn = (id) => {
    const { editing } = statuses;
    setTasks(() =>
      tasks.map((el) => {
        if (id === el.id) {
          el.prevStatus = el.status;
          el.status = editing;
        }
        return el;
      })
    );
  };

  const editingText = (id, text) => {
    setTasks(() =>
      tasks.map((el) => {
        if (id === el.id) {
          el.text = text;
          el.status = el.prevStatus;
        }
        return el;
      })
    );
  };

  const updateStopwatchTime = (id, time, playerState) => {
    setTasks((el) =>
      el.map((el) => {
        if (id === el.id) {
          el.stopwatchTime = time;
          el.playerState = playerState;
        }
        return el;
      })
    );
  };

  const { completed } = statuses;
  const sizeUncompleted = tasks.reduce((acc, { status }) => (acc += status !== completed), 0);
  const visibly = filterItems(tasks, filter, statuses) || [];

  return (
    <Context.Provider
      value={{
        deleteItem,
        editingBtn,
        editingText,
        deleteCompleted,
        changeFilter,
        updateStopwatchTime,
        addItem,
      }}
    >
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList tasks={visibly} statuses={statuses} doneToggle={(id, checked) => doneToggle(id, checked)} />
          <Footer sizeUncompleted={sizeUncompleted} filter={filter} />
        </section>
      </section>
    </Context.Provider>
  );
};

let maxId = 100;

export default App;

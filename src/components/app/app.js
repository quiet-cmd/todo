import React, { useState } from 'react';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';
import { Context } from '../context';

import './app.css';

const App = () => {
  const statuses = {
    all: 'all',
    completed: 'completed',
    editing: 'editing',
    uncompleted: 'uncompleted',
  };
  const [filter, setFilter] = useState(statuses.all);
  const [tasks, setTasks] = useState([]);

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

  const filterItems = (items, filter) => {
    const { all, completed, uncompleted } = statuses;
    if (filter === all) return items;
    if (filter === uncompleted) return items.filter(({ status }) => status === uncompleted);
    if (filter === completed) return items.filter(({ status }) => status === completed);
  };

  const toggleProgressStatus = (id) => {
    const { completed, uncompleted } = statuses;
    setTasks(() =>
      tasks.map((el) => {
        const { status, checked } = el;
        if (id === el.id) {
          el.status = status === completed ? uncompleted : completed;
          el.checked = !checked;
        }
        return el;
      })
    );
  };

  const setEditingStatus = (id) => {
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

  const setNewText = (id, text) => {
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

  const rememberStateStopwatch = (id, time, playerState) => {
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

  const { completed, editing } = statuses;
  const sizeUncompleted = tasks.reduce((acc, { status }) => (acc += status !== completed), 0);
  const visibly = filterItems(tasks, filter) || [];
  return (
    <Context.Provider
      value={{
        deleteItem,
        setEditingStatus,
        setNewText,
        deleteCompleted,
        changeFilter,
        rememberStateStopwatch,
        addItem,
        statuses,
      }}
    >
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList
            tasks={visibly}
            editing={editing}
            toggleProgressStatus={(id, checked) => toggleProgressStatus(id, checked)}
          />
          <Footer sizeUncompleted={sizeUncompleted} filter={filter} />
        </section>
      </section>
    </Context.Provider>
  );
};

let maxId = 100;

export default App;

import React, { Component } from 'react';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

class App extends Component {
  maxId = 100;

  state = {
    tasks: [],
    statuses: {
      completed: 'completed',
      editing: 'editing',
      uncompleted: 'uncompleted',
    },
    filter: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ tasks }) => ({ tasks: tasks.filter(({ id: el }) => el !== id) }));
  };

  addItem = (value, minutes, seconds) => {
    const status = this.state.statuses.uncompleted;
    const item = {
      id: this.maxId++,
      status: status,
      prevStatus: status,
      text: value,
      createTime: new Date().getTime(),
      checked: false,
      stopwatchTime: minutes * 60 * 1000 + seconds * 1000,
      playerState: false,
    };
    this.setState(({ tasks }) => ({ tasks: [...tasks, item] }));
  };

  deleteCompleted = () => {
    this.setState(({ tasks, statuses: { completed } }) => {
      return { tasks: tasks.filter(({ status }) => status !== completed) };
    });
  };

  changeFilter = (filter) => {
    this.setState({ filter: filter });
  };

  filterItems(items, filter, filters) {
    const { completed, uncompleted } = filters;
    if (filter === 'all') return items;
    if (filter === 'uncompleted') return items.filter(({ status }) => status === uncompleted);
    if (filter === 'completed') return items.filter(({ status }) => status === completed);
  }

  doneToggle = (id) => {
    this.setState(({ tasks, statuses: { completed, uncompleted } }) => {
      return {
        tasks: tasks.map((el) => {
          let { status, checked } = el;
          if (id === el.id) {
            el.status = status === completed ? uncompleted : completed;
            el.checked = !checked;
          }
          return el;
        }),
      };
    });
  };

  editingBtn = (id) => {
    this.setState(({ tasks, statuses: { editing } }) => {
      return {
        tasks: tasks.map((el) => {
          if (id === el.id) {
            el.prevStatus = el.status;
            el.status = editing;
          }
          return el;
        }),
      };
    });
  };

  editingText = (id, text) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((el) => {
          if (id === el.id) {
            el.text = text;
            el.status = el.prevStatus;
          }
          return el;
        }),
      };
    });
  };

  updateStopwatchTime = (id, time, playerState) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((el) => {
          if (id === el.id) {
            el.stopwatchTime = time;
            el.playerState = playerState;
          }
          return el;
        }),
      };
    });
  };

  render() {
    const { tasks, filter, statuses } = this.state;
    const { completed } = statuses;
    const sizeUncompleted = tasks.reduce((acc, { status }) => (acc += status !== completed), 0);
    const visibly = this.filterItems(tasks, filter, statuses);

    return (
      <section className="todoapp">
        <Header addItem={(text, minutes, seconds) => this.addItem(text, minutes, seconds)} />
        <section className="main">
          <TaskList
            tasks={visibly}
            statuses={statuses}
            onDeleted={(id) => this.deleteItem(id)}
            doneToggle={(id, checked) => this.doneToggle(id, checked)}
            editingBtn={(id) => this.editingBtn(id)}
            editingText={(id, text) => this.editingText(id, text)}
            updateStopwatchTime={(id, time, playerState) => this.updateStopwatchTime(id, time, playerState)}
          />
          <Footer
            sizeUncompleted={sizeUncompleted}
            filter={filter}
            deleteCompleted={() => this.deleteCompleted()}
            changeFilter={(text) => this.changeFilter(text)}
          />
        </section>
      </section>
    );
  }
}

export default App;

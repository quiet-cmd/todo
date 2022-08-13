import React, { Component } from 'react';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {
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
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter(({ id: el }) => {
          return el !== id;
        }),
      };
    });
  };

  addItem = (text) => {
    const status = this.state.statuses.uncompleted;
    const item = {
      id: this.maxId++,
      status: status,
      prevStatus: status,
      text: text,
      createTime: new Date().getTime(),
    };
    this.setState(({ tasks }) => {
      return {
        tasks: [...tasks, item],
      };
    });
  };

  deleteCompleted = () => {
    this.setState(({ tasks, statuses: { completed } }) => {
      return { tasks: tasks.filter(({ status }) => status !== completed) };
    });
  };

  changeFilter = (filter) => {
    this.setState(() => ({ filter: filter }));
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
          let { status } = el;
          if (id === el.id) el.status = status === completed ? uncompleted : completed;
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

  render() {
    const { tasks, filter, statuses } = this.state;
    const { completed } = statuses;
    const sizeUncompleted = tasks.reduce((acc, { status }) => (acc += status !== completed), 0);
    const visibly = this.filterItems(tasks, filter, statuses);

    return (
      <section className="todoapp">
        <Header addItem={(text) => this.addItem(text)} />
        <section className="main">
          <TaskList
            tasks={visibly}
            statuses={statuses}
            onDeleted={(id) => this.deleteItem(id)}
            doneToggle={(id) => this.doneToggle(id)}
            editingBtn={(id) => this.editingBtn(id)}
            editingText={(id, text) => this.editingText(id, text)}
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

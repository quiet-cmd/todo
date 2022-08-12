import React, { Component } from 'react';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    tasks: [
      /*
      { id: 1, status: '', text: 'Completed task' },
      { id: 2, status: 'editing', text: 'Editing task' },
      { id: 3, status: '', text: 'Active task' },
      */
    ],
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
    const item = {
      id: this.maxId++,
      status: '',
      text: text,
    };
    this.setState(({ tasks }) => {
      return {
        tasks: [...tasks, item],
      };
    });
  };

  deleteCompleted = () => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter(({ status: el }) => {
          return el !== 'completed';
        }),
      };
    });
  };

  changeFilter = (filter) => {
    this.setState(() => {
      return { filter: filter };
    });
  };

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    }
    if (filter === 'uncompleted') {
      return items.filter((item) => {
        return !item.status;
      });
    }
    if (filter === 'completed') {
      return items.filter((item) => {
        return item.status;
      });
    }
  }

  doneToggle = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((el) => {
          let { status } = el;
          if (id === el.id) {
            el.status = status === 'completed' ? '' : 'completed';
          }
          return el;
        }),
      };
    });
  };

  editingBtn = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((el) => {
          if (id === el.id) {
            el.status = 'editing';
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
            el.status = '';
          }
          return el;
        }),
      };
    });
  };

  render() {
    const { tasks, filter } = this.state;
    const sizeUncompleted = tasks.reduce((acc, { status }) => (acc += status !== 'completed'), 0);
    const visibly = this.filterItems(tasks, filter);

    return (
      <section className="todoapp">
        <Header addItem={(text) => this.addItem(text)} />
        <section className="main">
          <TaskList tasks={visibly} onDeleted={(id) => this.deleteItem(id)} doneToggle={(id) => this.doneToggle(id)} editingBtn={(id) => this.editingBtn(id)} editingText={(id, text) => this.editingText(id, text)} />
          <Footer sizeUncompleted={sizeUncompleted} filter={filter} deleteCompleted={() => this.deleteCompleted()} changeFilter={(text) => this.changeFilter(text)} />
        </section>
      </section>
    );
  }
}

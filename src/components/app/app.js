import React, { Component } from "react";

import Header from "../header";
import TaskList from "../task-list";
import Footer from "../footer";

import './app.css'


export default class App extends Component {

    maxId = 100;

    state = {
        tasks: [ //status -> editing || completed || ''
            {id: 1, status: '', text: 'Completed task'},
            {id: 2, status: 'editing', text: 'Editing task'},
            {id: 3, status: '', text: 'Active task'},
        ],
    };

    deleteItem = (id) => {
        this.setState( ( {tasks} ) => {
            return {
                tasks: tasks.filter( ( {id: el} ) => { return el !== id} )
            }
        });
    };

    addItem = (text) => {
        const item = {
            id: this.maxId++,
            status: '',
            text: text,
        };
        this.setState( ({tasks}) => {
            console.log([item, ...tasks])
            return {
                tasks: [...tasks, item]
            }
        });
    };

    doneToggle = (id) => {
        this.setState( ( {tasks} ) => {
            return {
                tasks: tasks.map( (el) => { 
                    let {status} = el
                    if(id === el.id) {
                        el.status = status === 'completed' ? '': 'completed';
                    }
                    return el;
                })
            };
        });
    };

    render() {

        const { tasks } = this.state

        return (
            <section className="todoapp">
                <Header addItem={ (text) => this.addItem(text) }/>
                <section className="main">
                    <TaskList tasks={ tasks } onDeleted={ (id) => this.deleteItem(id) } doneToggle={ (id) => this.doneToggle(id) }/>
                    <Footer />
                </section>
            </section>     
        );
    };
};

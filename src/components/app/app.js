import React, { Component } from "react";

import Header from "../header";
import TaskList from "../task-list";
import Footer from "../footer";

import './app.css'


export default class App extends Component {

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

    doneToggle = (id) => {
        this.setState( ( {tasks} ) => {
            return {
                tasks: tasks.map( (el) => { 
                    let {status} = el
                    if(id === el.id) {
                        el.status = status === 'completed' ? '': 'completed';
                    }
                    return el
                })
            };
        });
    };

    render() {

        const { tasks } = this.state

        return (
            <section className="todoapp">
                <Header />
                <section className="main">
                    <TaskList tasks={ tasks } onDeleted={ (id) => this.deleteItem(id) } doneToggle={ (id) => this.doneToggle(id) }/>
                    <Footer />
                </section>
            </section>     
        );
    };
};

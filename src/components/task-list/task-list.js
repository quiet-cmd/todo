import React, { Component } from "react";

import Task from "../task";
import TaskEditing from "../task-editing";

import './task-list.css'

export default class TaskList extends Component {

    render() {
        const { tasks, onDeleted, doneToggle, editingBtn, editingText } = this.props;

        const task = tasks.map( ( {id, status, ...par} ) => {
            return (
                <li key={ id } className={ status.toString() } >
                    <Task {...par}
                    onDeleted={ () => onDeleted(id) }
                    doneToggle= { () => doneToggle(id) }
                    editingBtn= { () => editingBtn(id)}/>
                    { status === 'editing' && <TaskEditing editingText={ (text) => editingText(id, text) }/> }
                </li>
            );
        });
    
    
        return (
            <ul className="todo-list">
                { task }
            </ul>
        );
    };
    
};

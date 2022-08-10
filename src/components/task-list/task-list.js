import React from "react";

import Task from "../task";
import TaskEditing from "../task-editing";

import './task-list.css'


const TaskList = ( { tasks } ) => {

    const task = tasks.map( ( {id, status, ...par} ) => {
        return ( 
            <li key={ id } className={ status.toString() }>
                <Task {...par} />
                { status === 'editing' && <TaskEditing /> }
            </li>
        );
    });


    return (
        <ul className="todo-list">
            { task }
        </ul>
    );
};

export default TaskList;

import React, { Component } from "react";

import './task.css'

export default class Task extends Component {

    render() {

        const { text, onDeleted, doneToggle, editingBtn } = this.props;

        return (
            <div className="view">
                <input className="toggle" type="checkbox" onClick={ doneToggle }/>
                <label>
                    <span className="description">{ text }</span>
                    <span className="created">created 17 seconds ago</span>
                </label>
                <button className="icon icon-edit" onClick={ editingBtn }></button>
                <button className="icon icon-destroy" onClick={ onDeleted }></button>
        </div>
        );
    };
};

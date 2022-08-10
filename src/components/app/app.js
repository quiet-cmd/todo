import React from "react";

import Header from "../header";
import TaskList from "../task-list";
import Footer from "../footer";

import './app.css'


const App = () => {

    const tasks = [  //status -> editing || completed || false
        {id: 1, status: 'completed', text: 'Completed task'},
        {id: 2, status: 'editing', text: 'Editing task'},
        {id: 3, status: false, text: 'Active task'},
    ];

    return (
        <section className="todoapp">
            <Header />
            <section className="main">
                <TaskList tasks={ tasks }/>
                <Footer />
            </section>
        </section>     
    );
};

export default App;

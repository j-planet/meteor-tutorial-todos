import React, { Component } from 'react';

import Task from './task';


class App extends Component {

    constructor(props) {
        super(props);
    }

    getTasks() {
        return [
            { _id: 1, text: 'task #1'},
            { _id: 2, text: 'task #2'},
            { _id: 3, text: 'task #3'}
        ];
    }

    renderTasks() {
        return this.getTasks().map
        (
            (task) => <Task key={task._id} task={task} />
        );
    }

    render() {
        return (
            <div>
                <h1>Hello, welcome to App.</h1>

                <ul>
                    { this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default App;
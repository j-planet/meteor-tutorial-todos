import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Task from './task';
import { TaskData } from '../../api/tasks';


class App extends Component {

    constructor(props) {
        super(props);
    }

    renderTasks() {
        return this.props.tasks.map
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

App.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default createContainer(
    () => {
        return {
            tasks: TaskData.find({}).fetch()
        };
    },
    App
);
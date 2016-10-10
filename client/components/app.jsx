import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Task from './task';
import { TaskData } from '../../api/tasks';


class App extends Component {

    constructor(props)
    {
        super(props);
    }

    handleSubmit(event)
    {
        event.preventDefault();

        // the field of interest
        const field = ReactDOM.findDOMNode(this.refs.textInput);

        // retrieve text input value
        const text = field.value.trim();

        // Clear form
        field.value = '';

        // insert into the database via API
        TaskData.insert({
            text,
            createdAt: new Date()
        });
    }

    renderTasks()
    {
        return this.props.tasks.map
        (
            (task) => <Task key={task._id} task={task} />
        );
    }

    render()
    {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>

                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type here to add new tasks."
                        />
                    </form>
                </header>

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
            tasks: TaskData.find({}, { sort: {createdAt: -1} }).fetch()
        };
    },
    App
);
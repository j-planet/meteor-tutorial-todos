import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Task from './task';
import { TaskData } from '../../api/task_data';
import AccountsUIWrapper from './accountsUIWrapper';


class App extends Component {

    constructor(props)
    {
        super(props);

        this.state = {hideCompleted: false};
    }

    toggleHideCompleted()
    {
        this.setState({ hideCompleted: !this.state.hideCompleted });
    }

    handleNewTaskSubmit(event)
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
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    }

    renderTasks()
    {
        let filteredTasks = this.props.tasks;

        if (this.state.hideCompleted)
        {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }

        return filteredTasks.map
        (
            (task) => <Task key={task._id} task={task} />
        );
    }

    render()
    {
        const numIncompleted = this.props.tasks.filter(task => !task.checked).length;

        return (
            <div className="container">
                <header>
                    <h1>Todo List ({numIncompleted}) </h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />

                    { this.props.currentUser
                        ?
                        <form className="new-task" onSubmit={this.handleNewTaskSubmit.bind(this)}>
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type here to add new tasks."
                            />
                        </form>
                        : ''
                    }
                </header>

                <ul>
                    { this.renderTasks()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(
    () => {
        return {
            tasks: TaskData.find({}, { sort: {createdAt: -1} }).fetch(),
            currentUser: Meteor.user()
        };
    },
    App
);
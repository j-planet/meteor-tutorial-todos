import React, { Component, PropTypes } from 'react';
import {Meteor} from 'meteor/meteor';


class Task extends Component {

    constructor(props) {
        super(props);
    }

    toggleChecked()
    {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }

    deleteTask()
    {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    render() {
        const cssClassName = this.props.task.checked ? 'checked' : ''; // for CSS

        return (

            <li className={cssClassName}>

                <button className="delete" onClick={this.deleteTask.bind(this)} >
                    &times;
                </button>

                <input
                    type = "checkbox"
                    readOnly
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}
                />

                <span className="text">
                    <strong>
                        {this.props.task.username}
                    </strong>
                    :{this.props.task.text}
                </span>

            </li>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired
};

export default Task;
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';


class Task extends Component {

    constructor(props) {
        super(props);
    }

    toggleChecked()
    {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }

    togglePrivate()
    {
        Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
    }

    deleteTask()
    {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    render() {
        const cssClassName = classnames({
            checked: this.props.task.checked,
            private: this.props.task.private
        });

        return (

            <li className={cssClassName}>

                    <button className="delete" onClick={this.deleteTask.bind(this)}>
                        &times;
                    </button>

                { this.props.showPrivateButton
                    ?
                    <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                        { this.props.task.private ? 'Private' : 'Public'}
                    </button>
                    : ''
                }

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
    task: PropTypes.object.isRequired,
    showPrivateButton: PropTypes.bool.isRequired
};

export default Task;
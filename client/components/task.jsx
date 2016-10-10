import React, { Component, PropTypes } from 'react';

import { TaskData } from '../../api/task_data';


class Task extends Component {

    constructor(props) {
        super(props);
    }

    toggleChecked()
    {
        TaskData.update(
            this.props.task._id,
            {
                $set: { checked: !this.props.task.checked }
            });
    }

    deleteTask()
    {
        TaskData.remove(this.props.task._id)
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

                <span className="text">{this.props.task.text}</span>

            </li>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired
};

export default Task;
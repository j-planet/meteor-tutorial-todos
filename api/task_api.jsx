import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// on the server side: sets up a MongoDB collection;
// on the client side: creates a cache connected to the server collection
export const TaskCollection = new Mongo.Collection('tasks');

// This code runs only on the server.
if (Meteor.isServer)
{
    Meteor.publish('tasks', function tasksPublication()
    {
        return TaskCollection.find(
            {
                $or: [
                    { private: { $ne: true}},   // not private
                    { owner: this.userId}       // or, belongs to the current uer
                ]
            }
        );
    });
}

Meteor.methods({
   'tasks.insert'(text)
   {
       check(text, String);

       // make sure the user is logged in before inserting
       if (!this.userId) throw new Meteor.Error('not-authorized');

       TaskCollection.insert({
           text,
           createdAt: new Date(),
           owner: this.userId,
           username: Meteor.users.findOne(this.userId).username
       });
   },

    'tasks.remove'(taskId)
    {
        check(taskId, String);

        // only public or private tasks owned by the current user can be deleted
        const task = TaskCollection.findOne(taskId);
        if (task.private && task.owner !== this.userId) throw new Meteor.Error('not-authorized');

        TaskCollection.remove(taskId);
    },

    'tasks.setChecked'(taskId, setChecked)
    {
        check(taskId, String);
        check(setChecked, Boolean);

        // only public or private tasks owned by the current user can be check-toggled
        const task = TaskCollection.findOne(taskId);
        if (task.private && task.owner !== this.userId) throw new Meteor.Error('not-authorized');

        TaskCollection.update(taskId, { $set: { checked: setChecked}});
    },

    'tasks.setPrivate'(taskId, setToPrivate)
    {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = TaskCollection.findOne(taskId);

        // make sure only the task owner can make a task private
        if (task.owner !== this.userId) throw new Meteor.Error('not-authorized');

        TaskCollection.update(taskId, { $set: { private: setToPrivate}});
    }
});
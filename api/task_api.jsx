import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// on the server side: sets up a MongoDB collection;
// on the client side: creates a cache connected to the server collection
export const TaskCollection = new Mongo.Collection('tasks');

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

        TaskCollection.remove(taskId);
    },

    'tasks.setChecked'(taskId, setChecked)
    {
        check(taskId, String);
        check(setChecked, Boolean);

        TaskCollection.update(taskId, { $set: { checked: setChecked}});
    }
});
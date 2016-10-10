import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { TaskCollection } from './task_api';


if (Meteor.isServer)
{
    describe('Tasks', () =>
    {
        describe('methods', () =>
        {
            it('Can start testing.', () => {});

            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                TaskCollection.remove({});
                taskId = TaskCollection.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'mochatestuser'
                });
            });

            it('deletes own task.', () => {
                // how to api from the server side
                const deleteMethod = Meteor.server.method_handlers['tasks.remove'];

                const invocation = { userId };

                deleteMethod.apply(invocation, [taskId]);   // method.apply(invocation (environment??), [arguments])

                assert.equal(TaskCollection.find().count(), 0);
            });
        });
    });
}
import { Mongo } from 'meteor/mongo';


// on the server side: sets up a MongoDB collection;
// on the client side: creates a cache connected to the server collection
export const TaskData = new Mongo.Collection('tasks');
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simple-schema';


export const Documentations = new Mongo.Collection('documentations');
Documentations.schema = new SimpleSchema({
  keywords: {type: String},
  url: {type: String},
});

// Links._ensureIndex({"keywords":"text"});
// Links.rawCollection().createIndex({"keywords":"text"});
/*
if (Meteor.isServer) {
  Meteor.publish('documentations', (query) => {
    return Documentations.find({$text: {$search: "dogs"}}, {score: {$meta: "toextScore"}}).sort({score:{$meta:"textScore"}});
  });
}
*/

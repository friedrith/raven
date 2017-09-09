import { Meteor } from 'meteor/meteor';
import { Documentations } from '../imports/api/documentations';
import { findData } from './github'
import { ServiceConfiguration } from 'meteor/service-configuration';
/*
let github = null;


const listRepositories = (context, callback) => {
  console.log('github', github);
  github.repos.getForUser({
      username: "friedrith"
  }, function(err, res) {

    const repositories = [];

    for(repo of res.data) {
      console.log('repo', repo.full_name);
      repositories.push({
        full_name: repo.full_name,
      });
    }

    callback && callback(null, repositories);
  });
};
*/

Meteor.startup(() => {

  Documentations._ensureIndex({ "keywords": "text" });

  ServiceConfiguration.configurations.upsert({
    service: 'github',
  }, {
    $set: {
      appId: Meteor.settings.github.clientId,
      loginStyle: "popup",
      secret: Meteor.settings.github.clientSecret,
    }
  });

  /*
  // code to run on server at startup
  github = new GitHub({
      version: "3.0.0", // required
      timeout: 5000     // optional
  });*/

  Meteor.methods({
    searchDocumentations: (query, callback) => {
      return Documentations.find({
        '$text': {'$search': query}},
        {
          fields: {
            score: { $meta: "textScore" },
          },
          sort: {score:{'$meta':'textScore'},
        }
      }).fetch();
      // return Meteor.wrapAsync(listRepositories)(context);
    },
    parseRepository: (context, callback) => {
      findData('thibaultfriedrich-backup', 'test-raven').then((results) => {
        for (const index in results) {
          Documentations.insert({
            keywords: results[index].keywords,
            url: results[index].url,
          });
        }
      }).catch((e) => {
        console.log('error', e);
      })
    }
  });
});

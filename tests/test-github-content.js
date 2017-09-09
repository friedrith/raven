const GitHub = require('github');

const github = new GitHub({
    version: "3.0.0", // required
    timeout: 5000,     // optional
    debug: true,
});

const username = 'thibaultfriedrich-backup';
const repo = 'test-raven';

github.repos.getContent({
  owner: username,
  repo: repo,
  path: 'README.md',
}, function (err, res) {
  console.log(res);
});

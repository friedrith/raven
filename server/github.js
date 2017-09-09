import GitHub from 'github';

const github = new GitHub({
    version: "3.0.0", // required
    timeout: 5000,     // optional
    // debug: true,
});

function parsePackage (owner, repo, path) {
  return new Promise((resolve, reject) => {
    parseFile(owner, repo, path).then((content) => {
      resolve(JSON.parse(content).keywords);
    }).catch((e) => {
      reject(e);
    });
  });
}

function parseDocumentation(owner, repo, path) {
  return new Promise((resolve, reject) => {
    parseFile(owner, repo, path).then((content) => {
      const results = [];
      const links = content.match(/\[.+?\]\(.+?\)/g);
      for (const i in links) {
        const link = links[i];
        const match = link.match(/\[(.+?)\]\((.+?)\)/);
        results.push({
          keywords: match[1],
          url: match[2],
        });
      }
      resolve(results);
    }).catch((e) => {
      reject(e);
    });
  });
}

function parseCodeJs(owner, repo, path) {
  return new Promise((resolve, reject) => {
    parseFile(owner, repo, path).then((content) => {
      const results = [];
      const comments = content.match(/(\s| )\/\/.+?\s/g);
      for (const i in comments) {
        const comment = comments[i];
        // const match = comment.match(/\/\/(.*?)(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))(.*?)\s/);
        console.log('comment', comment);
        // const match = link.match(/\[(.+?)\]\((.+?)\)/);
        // results.push({
        //   keyword: match[1],
        //   link: match[2],
        // });
      }
      resolve(results);
    }).catch((e) => {
      reject(e);
    });
  });
}



function parseFile (owner, repo, path) {
  return new Promise((resolve, reject) => {
    github.repos.getContent({
      owner: owner,
      repo: repo,
      path: path,
    }, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(Buffer.from(res.data.content, res.data.encoding).toString('utf8'));
      }
    });
  });
}

const listFile = (owner, repo) => {
  return new Promise((resolve, reject) => {
    github.repos.getCommits({
        owner: owner,
        repo: repo,
        per_page: 1,
    }, function(err, res) {
      github.gitdata.getTree({
        owner: owner,
        repo: repo,
        sha: res.data[0].sha,
      }, function (err, res) {
        resolve(res.data.tree);
      });
    });
  });
}

export const findData = (owner, repo) => {
  return new Promise((resolve, reject) => {
    listFile(owner, repo).then((files) => {
      for (const i in files) {
        var file = files[i]
        if (file.path === 'package.json') {
          parsePackage(owner, repo, file.path).then((keywords) => {
            console.log('keywords', keywords);
          }).catch((e) => {
            reject(e);
          })
        } else if (file.path.match(/.*\.md/)) {
          parseDocumentation(owner, repo, file.path).then((results) => {
            resolve(results);
            // callback && callback()
            //console.log('results', results);
          }).catch((e) => {
            reject(e);
          })
        }
      }
    });
  });

}

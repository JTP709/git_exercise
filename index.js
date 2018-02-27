const gitlog = require('gitlog');
const fs = require('fs');
 
const options =
    { repo: __dirname + '/kroger-basket'
    , number: 20
    , fields:
      [ 'abbrevHash'
      , 'authorName'
      , 'authorDate'
      , 'subject'
      ]
    };

let changelog = "#Change Log\n\n"

// Synchronous
let commits = gitlog(options);
//console.log(commits);
for (let i=0; i<commits.length; i++) {
  if (commits[i].subject.match(/^v[0-9].[0-9].[0-9]/)) {
    changelog += "##" + commits[i].subject + "\n\n"
  } else {
    changelog +=
    "* " + 
    "**" + commits[i].abbrevHash + "**" +
    " | " + 
    commits[i].authorDate + 
    " | " + 
    commits[i].authorName + 
    " | " + 
    commits[i].subject +
    "\n\n"
  }
}

fs.writeFile('changelog.md', changelog, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

 

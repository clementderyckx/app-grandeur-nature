const db = require(`${__dirname}/../lib/db/db.js`);
const utilities = require(`${__dirname}/../lib/utilitiesFunctions.js`);

db.connect({source: 'prod'});

utilities.allContactsInNotion().then('done !').catch(err => console.log(err));
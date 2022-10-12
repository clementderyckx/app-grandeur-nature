const ContactModel = require("../lib/db/contact");
const db = require(`${__dirname}/../lib/db/db.js`);
const Contact = require(`${__dirname}/../lib/classes/Contact.js`);


(async () => {

    db.connect({ source: 'prod'});

    const setBadgeCount = await ContactModel.updateMany({}, {$set: {"badgeCount": 0}});
    console.log('setBadgeCount : ');
    console.log(setBadgeCount);

    const setPresence = await ContactModel.updateMany({}, {$set: {"presence": false}});
    console.log('setPresence : ');
    console.log(setPresence);

    process.exit(1);

})().catch(err => console.error(err));

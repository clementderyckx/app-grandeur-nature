const db = require(`${__dirname}/../lib/db/db.js`);
const Contact = require(`${__dirname}/../lib/classes/Contact.js`);
const Export  = require(`${__dirname}/../lib/classes/Export.js`);


(async () => {

    db.connect({ source: 'local'});

    const contacts = await Contact.find();
    Export.contactsToCsv({ filename: 'presents-salon-gauchy', contacts: contacts });



})().catch(err => console.log(err))


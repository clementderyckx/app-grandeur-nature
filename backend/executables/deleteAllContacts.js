const Contact = require(`${__dirname}/../lib/classes/Contact.js`);
const db = require(`${__dirname}/../lib/db/db.js`);

( async () => {

    db.connect({source: 'local'});

    const contacts = await Contact.find();

    for(let contact of contacts) {
        const result = await Contact.deleteById(contact.id);
        console.log(result);
    }

})().catch(err => console.log(err));
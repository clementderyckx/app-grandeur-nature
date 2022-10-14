const db = require(`${__dirname}/../lib/db/db.js`);
const Contact = require(`${__dirname}/../lib/classes/Contact.js`);


(async () => {
    db.connect({ source: 'local'});
    const contacts = await Contact.find();

    for(let contact of contacts) {

        console.log(contact);
    }
    console.log(`There is ${contacts.length} contacts inside the database`);

})().catch(err => console.error(err));

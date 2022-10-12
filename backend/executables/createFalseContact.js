const Contact = require(`${__dirname}/../lib/classes/Contact.js`);
const Report = require(`${__dirname}/../lib/classes/Report.js`);
const Response = require(`${__dirname}/../lib/classes/Response.js`);
const db = require(`${__dirname}/../lib/db/db.js`);

function newContact(name, company, phone, email, postCode){
    const [lastname, firstname] = name.split(' ');
    return new Contact ({
        lastname: lastname,
        firstname: firstname,
        company: company,
        phone: phone,
        email: email,
        postCode: postCode
    })
}


(async (    ) => {

    db.connect({ source: 'local'});

    const results = []

    const clementPerso = newContact('Clément Deryckx', 'C2D', '0610892968', 'clement.deryckx@outlook.com', '59190');
    const clementOldPerso = newContact('Clément Deryckx', 'C2D', '0610892968', 'clement.deryckx@outlook.com', '59190');
    const clementTerradis = newContact('Clément Terradis', 'TERRADIS', '0610892968', 'clement@terradis.fr', '59190');
    const clementTerradisGmail = newContact('Clément TerradisGmail', 'TERRADIS', '0610892968', 'clement.terradis@gmail.com', '59190');
    const baptisteTest = newContact('Baptiste Gacon', 'C2D', '0610892968', 'baptiste.test.terradis@gmail.com', '77000');

    const contacts = [clementPerso, clementOldPerso, clementTerradis, clementTerradisGmail, baptisteTest];  

    for(let contact of contacts) {
        // console.log(contact)
        try {
            const save = await contact.save();
            results.push(new Response(200, `createFalseContacts -> Contact has been successfully added to the database`, save));
        }
        catch(err){
            results.push(new Response(400, `createFalseContacts -> An error occurred while added Contats to the database -> ${err.message}`, contact));
            continue;
        }

    };

    const report = await Report.generatesReport(200, 'CreateFalseContacts DONE', results);
    console.log(report);

    
    process.exit(1);

})().catch( async err => {
    const report = await Report.generatesReport(400, 'CreateFalseContacts ERROR', err);
    console.log(report);
    console.log(err);
})


const dotenv = require('dotenv').config({ path: `${__dirname}/../../.env` });
const db = require(`${__dirname}/../../lib/db/db.js`);
const utilities = require(`${__dirname}/../../lib/utilitiesFunctions.js`);
const Report = require(`${__dirname}/../../lib/classes/Report.js`);
const Utils = require(`${__dirname}/../../lib/classes/Utils.js`);
const Mail = require(`${__dirname}/../../lib/classes/Mail.js`);


// Toggle here source for prod purpose
db.connect({source: "prod"});
const [date, time] = Utils.getFrDate();
(async () => {
    try{
        const addNewContacts = await utilities.duplicateLocalContacts();
        const report = await Report.generatesReport(200, 'Duplicate local database to remote point', addNewContacts);
        return addNewContacts;
    } catch(err) {
        const report = await Report.generatesReport(400, 'Error on duplicate local database to remote point', err);
        const logMail = await Mail.sendLogMail('QrCodeApp error', `error on duplicate local db remotely at -> ${date} - ${time}`);
        console.log(logMail);
        process.exit(1);
    }

})()



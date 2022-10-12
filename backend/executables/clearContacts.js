const Contact = require(`${__dirname}/../lib/classes/Contact.js`);
const db = require(`${__dirname}/../lib/db/db.js`);
const Utils = require(`${__dirname}/../lib/classes/Utils.js`);
const utilities = require(`${__dirname}/../lib/utilities/clearDbContacts.js`);
const Report = require(`${__dirname}/../lib/classes/Report.js`);
const Response = require(`${__dirname}/../lib/classes/Response.js`);

db.connect({ source: 'prod'});


(async () => { 


    const allContacts = await Contact.find();
    for(let contact of allContacts){
        const newContact = await Contact.findByIdAndUpdate(contact.id, { email: Utils.clearMail(contact.email) })
    }
    const cleanCompanies = await cleanCompaniesString(allContacts);
    const addHasBadge = await addHasBadgeToAllContacts(allContacts);



    console.log('CLEAN COMPANIES RESULTS : ');
    console.log(cleanCompanies);
    console.log('ADD HAS BADGE RESULTS : ');
    console.log(addHasBadge);


})()
.then(() => console.log('Contacts mis à jour: correction informatique des informations, ajout de la propriété { hasBadge: false }'))
.catch((err) => console.log(err.message));

/**
 * Add hasBadge property set to false to all contacts
 * @param {Array} allContactsArray 
 * @returns {Object}
 */
async function addHasBadgeToAllContacts(allContactsArray ) {

    const results = [];
    const allContacts = (allContactsArray) ? allContactsArray : await Contact.find();

    for(let contact of allContacts) {
        try {
            const addBadge = await Contact.findByIdAndUpdate(contact.id, { hasBadge: false });
            results.push(new Response(200, `addHasBadgeToAllContacts -> Contact has been successfully updated`, addBadge));
        } catch (err) {
            results.push(new Response(400, `addHasBadgeToAllContacts -> An error occurred while updating contact`, err));
            continue;
        }
    }

    try {
        const report = await Report.generatesReport(200, 'Add hasBadge property to all contacts', results);
        return report;
    } catch(err){
        return new Response(400, 'an error occured on updating hadBadgeContacts -> ' + err.message, results);
    }


}

/**
 * Clear company string as much as possible to the 54 firsts contacts that has been damaged 
 * @param {Array} allContactsArray 
 * @returns {Object}
 */
async function cleanCompaniesString (allContactsArray) {

    const results = [];

    const allContacts = (allContactsArray) ? allContactsArray : await Contact.find();

    for (let i = 0; i < 54; i ++) {
        const contact = allContacts[i];
        const spaceBetween = utilities.spaceBetween(contact.company);
        if(spaceBetween.status === 200){
            contact.company = spaceBetween.result;
        }
        
        const trimServicesTechniques = utilities.trimServicesTechniques(contact.company);
        if(trimServicesTechniques.status === 200){
            contact.company = trimServicesTechniques.result;
        }

        const trimCommunauteAgglomeration = utilities.trimCommunauteAgglomeration(contact.company);
        if(trimCommunauteAgglomeration.status === 200){
            contact.company = trimCommunauteAgglomeration.result;
        }

        const trimEspacesVerts = utilities.trimEspacesVerts(contact.company);
        if(trimEspacesVerts.status === 200){
            contact.company = trimEspacesVerts.result;
        }

        const oneWordToTrim = ['SAS', 'ESAT', 'NORD', 'PAYSAGE', 'paysage', 'SERVICES'];
        for (let value of oneWordToTrim) {
            const company = contact.company;
            const trimedCompany = utilities.trimCharacter(company, value);
            if(trimedCompany.status === 200){
                contact.company = trimedCompany.result;
            }
        }

        try {
            const newContact = await Contact.findByIdAndUpdate(contact._id, contact);
            results.push(new Response(200, `cleanCompaniesString -> Contact has been successfully updated`, newContact));
        } catch (err) {
            results.push(new Response(400, `cleanCompaniesString -> An error occurred while updating contact`, err));
            continue;
        }

    }

    try {
        const report = await Report.generatesReport(200, 'Clear company property to first contacts.', results);
        return report;
    } catch(err){
        return new Response(400, 'an error occured on updating hadBadgeContacts -> ' + err.message, results);
    }
}


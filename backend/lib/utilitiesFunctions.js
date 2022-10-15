if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: `${__dirname}/../.env`});
}
const Contact = require(`${__dirname}/classes/Contact.js`);
const Notion = require(`${__dirname}/classes/Notion.js`);
const Response = require(`${__dirname}/classes/Response.js`);
const Report = require(`${__dirname}/classes/Report.js`);
const FormData = require('form-data'); 
const fs = require('fs');
const fetch = require('node-fetch');
/**
 * Put All contacts saved in the db inside the Notion Array
 * @returns 
 */
async function allContactsInNotion() {
    const notion = new Notion();
    const contacts = await Contact.find();
    const results = [];
    for (let contact of contacts){
        const newContact = new Contact(contact);
        try {
            const insertToNotion = await newContact.insertToNotion();
            results.push({ status: 200, contact: newContact, message: 'Contact has been added to Notion'});
        }
        catch (error) {
            results.push({ status: 400, contact: newContact, message: 'An error occured on adding contact to Notion -> ' + error.message});
        }

    }

    return results;
}

/**
 * Send the badge saved locally to the remote file server using its API
 * @param {Badge} badge  
 * @returns {Response}
 */
async function sendBadgesToRemoteServer(badges){
    const form = new FormData();
    for (let badge of badges){
        const file = fs.createReadStream(badge.localUrl);
        form.append(badge.id, file);
    }

    try {
        // console.log(form);
        const res = await fetch(process.env.FILEAPI, {
            method: 'POST',
            body: form
        })
        console.log('res :');
        console.log(res);
       return new Response( 200, "Send Badges process","Badges has been sent successfully to the remote server" );
    } catch(err){
        return new Response( 500, "Send Badges process",  `There was an error sending badges to the remote server -> Unable to join the server` );
    }

}

function checkIfPresent(contact, arrayToCheck){
    let isPresent = false;
    for (let contactInArray of arrayToCheck){
        if (contactInArray.firstname === contact.firstname && contactInArray.lastname === contact.lastname && contactInArray.email === contact.email){
            return true
        }
    }
    return isPresent
}

async function duplicateContacts(){

    const results = [];
    const fetchRes = await fetch(`${process.env.APPURL}/salon/contacts/users/all/`)
    const contacts = await fetchRes.json();
    // const contacts = res;
    const dbContacts = await Contact.find();
    
    for (let contact of contacts){
        console.log(contact);
        const isPresent = checkIfPresent(contact, dbContacts);
        if(isPresent){
            results.push(new Response(400, `Contact is already in the database`, contact))
        } else {
            try {
                const save = await Contact.saveStatic(contact);
                results.push(new Response(200, 'Contact has been saved in the database', save));
                (index === 2) ? index = 0 : index ++;
            } catch (e){
                results.push(new Response(500, `An error occurred on registering contact : ${e.message}`, contact))
            }
        }
    }

    return results;

}


async function duplicateLocalContacts(){

    const results = [];
    const fetchRes = await fetch(`${process.env.LOCALAPPURL}/salon/contacts/all/`)
    const contacts = await fetchRes.json();
    const dbContacts = await Contact.find();

    // Remove remote contacts
    console.log('Starting removing remote contacts ...');
    let removedCount = 0;
    let errorRemovedCount = 0;
    let errorRemovedCountArray = [];
    for(let contact of dbContacts) {
        console.log(contact);
        try{
            const result = await Contact.deleteById(contact.id);
            console.log(result);
            removedCount ++;
        } catch(err){
            errorRemovedCount ++;
            errorRemovedCountArray.push(contacts);
            continue;
        }
    }
    
    console.log('Starting duplicating remote contacts ...');
    let duplicateCount = 0;
    let errorDuplicateCount = 0;
    let errorDuplicateCountArray = [];
    for (let contact of contacts){
        console.log(contact);
        try {
            const save = await Contact.saveStatic(contact);
            results.push(new Response(200, 'Contact has been saved in the database', save));
            duplicateCount++;
            (index === 2) ? index = 0 : index ++;
        } catch (e){
            results.push(new Response(500, `An error occurred on registering contact : ${e.message}`, contact))
            errorDuplicateCount++;
            errorDuplicateCountArray.push(contact);
            continue;
        }
    }

    console.log(`RAPPORT :`);
    console.log(`- ${removedCount} deleted for ${dbContacts.length} detected`);
    console.log(`ERROR FOR DELETION DETECTED : ${errorRemovedCount}`);
    console.log(errorRemovedCountArray);
    console.log(`- ${duplicateCount} duplicated for ${contacts.length} detected`);
    console.log(`ERROR FOR DUPLICATION DETECTED : ${errorDuplicateCount}`);
    console.log(errorDuplicateCountArray);
    return results;

}


function delay (ms) {
    return new Promise(resolve => setTimeout(resolve, ms)) 
};



module.exports = {
    allContactsInNotion: allContactsInNotion,
    sendBadgesToRemoteServer: sendBadgesToRemoteServer,
    duplicateContacts: duplicateContacts,
    duplicateLocalContacts: duplicateLocalContacts,
    delay: delay,

}
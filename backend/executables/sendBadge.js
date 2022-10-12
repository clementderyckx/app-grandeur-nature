const puppeteer = require('puppeteer');
const Badge = require(`${__dirname}/../lib/classes/Badge.js`);
const Contact = require(`${__dirname}/../lib/classes/Contact.js`);
const db = require(`${__dirname}/../lib/db/db.js`);
const QrCode = require(`${__dirname}/../lib/classes/QrCode.js`);
const Response = require(`${__dirname}/../lib/classes/Response.js`);
const Report = require(`${__dirname}/../lib/classes/Report.js`);
const utilitiesFunctions = require(`${__dirname}/../lib/utilitiesFunctions.js`);
const Utils = require(`${__dirname}/../lib/classes/Utils.js`);
const sendBadgeByMail = require(`${__dirname}/../lib/utilities/sendBadgeByMail.js`);
const Mail = require(`${__dirname}/../lib/classes/Mail.js`);

(async() => {

    db.connect({source: 'local'});
    const [date, time] = Utils.getFrDate();

    // ADDING NEW CONTACT TO LOCAL DB
    try{
        await utilitiesFunctions.duplicateContacts();
        console.log('Adding new contacts to the database is successfully done');
    } catch(err) {
        await Report.generatesReport(400, 'Error on duplicate database to local point', err);
        await Mail.sendLogMail(`QrCodeApp error -> Envoie des badges pour la session: ${date} - ${time}`, `Error on duplicate db locally at -> ${date} - ${time}. \n ${err}`);
        console.log(err);
        console.log('An error log has been generated and sent by mail to the app administrator.');
        process.exit(1);
    }

    // WAITING FOR CHANGES TO TAKE EFFECTS
    await utilitiesFunctions.delay(5000);

    const contacts = await Contact.findFiltered({hasBadge: false});
    if (contacts.length === 0) {
        let message = 'No contacts with hasBadge set to false detected'
        const report = await Report.generatesReport(200, "Send Badges process", message);
        await Mail.sendLogMail(`0 contacts détéctés pour envoie des badges pour la session: ${date} - ${time}`, message); // REPORT BY MAIL
        console.log(message);
        console.log('Exit Process.');
        process.exit(1);
    }
    console.log(`${contacts.length} contacts with no badges detected`);

    // GENERATES QRCODE
    const qrcodes = await generatesQrCodes(contacts);
    console.log(`${qrcodes.length} qrcode generated`);

    // GENERATES BADGES
    console.log(`Generates badge process starting...`);
    const badges = await generatesBadges(contacts);
    console.log(badges);
    console.log('Generates Badge process done !');


    // Send Badges to remote Server
    console.log('Send badges to remote server process starting...');
    const sendToServerResponse = await utilitiesFunctions.sendBadgesToRemoteServer(badges);
    if(sendToServerResponse.status === 500) {
        const report = await Report.generatesReport(sendToServerResponse.status, 'Send Badges process', sendToServerResponse.results);
        console.log('Error sending files to remote server');
        const errSendingMail = await Mail.sendLogMail(`Erreur d'envoie des badges pour la session: ${date} - ${time}`, "Une erreur s'est produite lors de l'envoi des badges au serveur distant. Le processus d'envoi a été avorté avant l'envoi des badges aux clients"); // ALERT BY MAIL

        process.exit(1);
    }
    console.log('Badges are saved on the remote server!');


    // SEND BADGES TO THE CONTACTS 
    console.log('Sending all badges by mail ...');

    const mailReponses = await sendBadges(badges);
    console.log('mailReponses : ');
    console.log(mailReponses);
    await utilitiesFunctions.delay(5000);

    console.log('Badges are sent to the contacts.');


    // UPDATE CONTACTS 
    console.log('Updating contacts that has received badge to { hasBadge: true }... ');
    for (let response of mailReponses){
        if(response.status === 200){
            const updateContact = await Contact.findByIdAndUpdate(response.result.badge.id, { hasBadge: true });
            response.result.isSaved = true;
        } else {
            response.result.isSaved = false;
        }
    }  
    console.log('Contacts updated !');


    // // GENERATES REPORT
    console.log('Generating readable report for sendBadge process');
    const report = await Report.generatesReport(200, "Send Badges process", mailReponses);
    const formattedContacts = Mail.getFormattedContactsFromResponses(mailReponses);
    await utilitiesFunctions.delay(10000);
    const logMail = await Mail.sendLogMail(`${contacts.length} traités pour envoie des badges pour la session: ${date} - ${time}`, formattedContacts); // REPORT BY MAIL
    console.log('Report generated and saved !');


//     // ClEANING APP
//     // Remove qrCodes
//     console.log('Removing QrCodes files...');
//    const removeQrCodes = [];
//     for(let qrCode of qrcodes) {
//         const remove = Files.remove(qrCode);
//     }
//     console.log('QrCodes removed');


})()
.then(() =>{ 
    console.log('Send Badges process is now Done');
    process.exit(1);
}).catch(e => {console.log(e.message); process.exit(1);})

/**
 * Takes an array containing contacts and generates qrcodes for them
 * @param {Array{Contact}} contacts 
 * @returns {Array} qrcodes
 */
async function generatesQrCodes(contacts){
    const qrcodes = [];
    for(let contact of contacts) {
        // Cleaning mail adress for all contacts
        const newContact = await Contact.findByIdAndUpdate(contact.id, { email: Utils.clearMail(contact.email) });
        const qrCode = new QrCode(contact);
        const file = await qrCode.generate();
        qrcodes.push(file.filePath);
        console.log(file.filePath);
    }
    return qrcodes;
}

async function generatesBadges(contacts){
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    const badges = [];
    for(let contact of contacts) {
        try{
            const badge = new Badge({contact: contact});
            const newBadge = await badge.generateBadge(page);
            badges.push(newBadge);
            console.log('badge Generated');

        } catch(e) {
            console.log(e); continue;
        }  
    }
    
    return badges;
}

/**
 * Send the badges Objects passes as parameters to the spécified email address, then return an Array containing the results
 * @param {Array{Badge}} badges 
 * @returns {Array} mailReponses
 */
async function sendBadges(badges){

    const mailReponses = [];
    const formattedContacts = [];

    for(let badge of badges) {
        try {
            const mailResult = await sendBadgeByMail(badge);
            if(mailResult && mailResult.accepted && mailResult.accepted.length > 0) {
                console.log(`Badge has been sent to ${badge.lastname} ${badge.firstname} successfully.`);
                mailReponses.push(new Response(200, 'Badge has been sent by mail successfully', {badge: badge, result: mailResult}));
            } else {
                mailReponses.push(new Response(400, 'There was an error sending the badge by mail', {badge: badge, result: err}));
            }
            await utilitiesFunctions.delay(20000);

        } catch(err){
            console.log(err);
            mailReponses.push(new Response(400, 'There was an error sending the badge by mail', {badge: badge, result: err}));
            continue;
        }
    }
    return mailReponses;
}
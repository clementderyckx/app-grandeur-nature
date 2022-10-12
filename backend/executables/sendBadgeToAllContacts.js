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

(async() => {

    db.connect({source: 'local'});

    const contacts = await Contact.find();
    console.log(`${contacts.length} contacts with no badges detected`);

    const qrCodesFiles = [];
    const badges = [];

    // GENERATES QRCODE
    for(let contact of contacts) {
        // Cleaning mail adress for all contacts
        const newContact = await Contact.findByIdAndUpdate(contact.id, { email: Utils.clearMail(contact.email) });

        const qrCode = new QrCode(contact);
        const file = await qrCode.generate();
        qrCodesFiles.push(file.filePath);
        console.log(file.filePath);
    }
    console.log(`${qrCodesFiles.length} qrcode generated`);

    // GENERATES BADGES
    console.log(`Generates badge process starting...`);
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    for(let contact of contacts) {
        const badge = new Badge({contact: contact});
        const newBadge = await badge.generateBadge(page);
        badges.push(newBadge);
    }
    console.log('Generates Badge process done !');


    // // Send Badges to remote Server
    // console.log('Send badges to remote server process starting...');
    // const sendToServerResponse = await utilitiesFunctions.sendBadgesToRemoteServer(badges);
    // if(sendToServerResponse.status === 500) {
    //     const report = await Report.generatesReport(sendToServerResponse.status, 'Send Badges process', sendToServerResponse.results);
    //     console.log('Error sending files to remote server');
    //     process.exit(1);
    // }
    // console.log('Badges are saved on the remote server!');



    // send Invitation with Badge to the contact  
    console.log('Sending all badges by mail ...');
   const sendBadgeResults = [];

    for(let badge of badges) {

        try {
            // const mail = new MailInvitation(badge, {badgeUrl: badge.url});
            // const mailResult = await mail.sendBadgeByMail();
            console.log(badge);
            const mailResult = await sendBadgeByMail(badge);
            if(mailResult) {
                sendBadgeResults.push(new Response(200, 'Badge has been sent by mail successfully', {badge: badge, result: mailResult}));
                console.log(`Succes sending mail to : ${badge.firstname} ${badge.lastname}`);
                console.log('response :');
                console.log(mailResult);
                
            } 
            await utilitiesFunctions.delay(15000);

        } catch(err){
            console.log(err);
            sendBadgeResults.push(new Response(400, 'There was an error sending the badge by mail', {badge: badge, result: err}));
            continue;
        }
    }
    console.log('Send badges process is done !');


    // UPDATE CONTACTS 
    console.log('Updating contacts that has received badge to { hasBadge: true }... ');
    for (let response of sendBadgeResults){
        try {
            if(response.status === 200){
                const updateContact = await Contact.findByIdAndUpdate(response.result.badge.id, { hasBadge: true });
                response.result.isSaved = true;
            } else {
                response.result.isSaved = false;
            }
        } catch(err){
            response.result.isSaved = false;
            continue;
        }
    }
    console.log('Contacts updated !');


    // GENERATES REPORT
    console.log('Generating readable report for sendBadge process');
    const report = await Report.generatesReport(200, "Send Badges process", sendBadgeResults);
    console.log('Report generated and saved !');


//     console.log('Cleaning app ...');
//     // Remove qrCodes
//     console.log('Removing QrCodes files...');
//    const removeQrCodes = [];
//     for(let qrCode of qrCodesFiles) {
//         const remove = Files.remove(qrCode);
//     }
//     console.log('QrCodes removed');
//     // Remove local badges
//     console.log('Removing badges local files...');
//     for(let badge of badges) {
//         const remove = Files.remove(badge.localUrl);
//     }
//     console.log('Local badges removed');


})()
.then(() =>{ 
    console.log('Send Badges process is now Done');
    process.exit(1);


}).catch(e => console.log(e.message))


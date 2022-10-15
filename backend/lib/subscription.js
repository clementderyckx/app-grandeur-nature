const db = require(`${__dirname}/db/contact`);
const Contact = require(`${__dirname}/classes/Contact`);
const QrCode = require(`${__dirname}/classes/QrCode`);
const MailInvitation = require(`${__dirname}/classes/MailInvitation`);
const Response = require(`${__dirname}/classes/Response`);
const mongoose = require('mongoose');

// const Badge = require(`${__dirname}/classes/Badge`);

async function createSubscription(req) {
    const contact = new Contact(req.body);
    const savedResponse = await contact.save();
    // console.log(savedResponse);
    if(savedResponse.status === 200){
        const notion = await contact.insertToNotion();
        // const qrCode = new QrCode(contact);
        // const generateQrCode = await qrCode.generate();
        // const badge = new Badge(qrCode);
        // await badge.generateBadge();
        const mail = new MailInvitation(contact);
            // mail.sendMail();
        console.log(`subscription process ended successfully`);
        return savedResponse;
    } else {
        return savedResponse;
    }
}

async function checkIfPresent(req){

        if(!mongoose.isValidObjectId(req.params.id)){
            return new Response(400, "Not a valid objectID", {})
        }

        const contact = await Contact.findById(req.params.id);
        let result = "";
        let textResponse = "";
        if(!contact){
            return new Response(404, "Contact not found", {})
        } else if(contact.presence === false) {
            result = await Contact.findByIdAndUpdate(contact.id, { presence: true, badgeCount: 1 });
        } else {
            const badgeCount = contact.badgeCount + 1;
            result = await Contact.findByIdAndUpdate(contact.id, { badgeCount: badgeCount });
        }
    
        return new Response(200, "Contact has been found and updated", result);
        
}

module.exports = {
    createSubscription: createSubscription,
    checkIfPresent: checkIfPresent
}
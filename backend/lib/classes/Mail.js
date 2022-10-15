if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: `${__dirname}/../../.env`});
}
const nodemailer = require('nodemailer');
const fs = require('fs');

class Mail{

    static async sendLogMail(subject, message){
        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SIBACCOUNT,
                pass: process.env.SIBPWD
            },
        });
    
        let mail = await transporter.sendMail({
            from: 'QrCodeApp <clement.terradis@gmail.com>',
            to: 'clement.deryckx@outlook.com',
            subject: subject,
            text: message,
        });
    
        return mail;
    }

    static getContactMailRow(contact, result){
        let toAdd = '';
        if(result === 200 || result === true || result === "true"){
            toAdd = "TRUE";
        } else if(result === 400 || result === 500 || result === false || result === "false"){
            toAdd = "FALSE";
        }
        return `${contact.lastname} ${contact.firstname} - ${contact.company} - ${contact.email}  --> ${toAdd}`;
    }
    
    static getFormattedContacts(contacts) {
        const contactsStrings = [];
        contactsStrings.push('Report is now available')
        for(let contact of contacts){
            // console.log(contact);
            const contactString = Mail.getContactMailRow(contact, true);
            contactsStrings.push(contactString);
        }
        return contactsStrings.join('\n');
    }

    static getFormattedContactsFromResponses(reponses) {
        const contactsStrings = [];
        contactsStrings.push('Report is now available')
        for(let response of reponses){
            // console.log(contact);
            const contactString = Mail.getContactMailRow(response.result.badge, response.status);
            contactsStrings.push(contactString);
        }
        return contactsStrings.join('\n');
    }

    static async sendTextMail({to, subject, message}){
        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SIBACCOUNT,
                pass: process.env.SIBPWD
            },
        });
    
        let mail = await transporter.sendMail({
            from: 'Clément DERYCKX <clement.deryckx@outlook.com>',
            to: to,
            subject: subject,
            text: message,
        });
    
        return mail;
}
}

module.exports = Mail;
require('dotenv').config({path: `${__dirname}/../../.env`});
const nodemailer = require('nodemailer');
const fs = require('fs');
const Utils = require(`${__dirname}/../classes/Utils.js`);
async function sendBadgeByMail(badge){

    const user = {
        account: process.env.SIBACCOUNT,
        pwd: process.env.SIBPWD
    }

    let transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        secure: false,
        auth: {
            user: user.account,
            pass: user.pwd
        },
    });

    const mailText = `Bonjour ${badge.firstname} ${badge.lastname},
    
        Vous trouverez ci-joint votre badge d’accès au Salon Grandeur Nature à Gauchy le 15 septembre 2022

        N’oubliez pas de le prendre avec vous pour pouvoir accéder à notre salon.
        RDV au complexe sportif Barran – Parc Jean Bouin, rue de Picardie, 02430 GAUCHY dès 8h30.


        Cordialement,

        Perrine
        Assistante commerciale
        S.A.S SOCODIP
        03.28.43.16.16`;

    let mail = await transporter.sendMail({
        from: 'SOCODIP <salon.socodip@gmail.com>',
        // to: 'clement.deryckx@outlook.com',
        to: Utils.clearMail(badge.email),
        subject: "Votre badge d'entrée salon Grandeur Nature",
        text: mailText,
        attachments: [{ filename:'badge-salon-gauchy.pdf', content: fs.createReadStream(badge.localUrl)}]
    })

    return mail

}

module.exports = sendBadgeByMail;
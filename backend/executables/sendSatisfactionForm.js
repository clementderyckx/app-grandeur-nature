require('dotenv').config({path: `${__dirname}/../.env`});
const db = require(`${__dirname}/../lib/db/db.js`);
const Contact = require(`${__dirname}/../lib/classes/Contact.js`);
const Mail = require(`${__dirname}/../lib/classes/Mail.js`);
const utilitiesFunctions = require(`${__dirname}/../lib/utilitiesFunctions.js`);

(async() => {

    db.connect({ source: 'prod'});

    const url = process.env.SATISFACTIONFORMURL;
    const contacts = await Contact.findFiltered({presence: true});
    const sendSucces = [];
    for(let present of contacts) {
        console.log('Next : ');
        console.log(present);

        const formUrl = `${url}/${present._id}`
        const message = `Bonjour, 
        
        Suite à votre présence à notre salon Granderu Nature à Gauchy, nous mettons à votre disposition un questionnaire de satisfaction qui ne vous prendra pas plus de 2 minutes à remplir en cliquant sur ce lien: ${formUrl} .
        Nous vous remerçions par avance du temps que vous prendrez pour nous faire votre retour.

        Cordialement, 
        L'équipe SOCODIP
        `
        const mail = await Mail.sendTextMail({to: present.email, subject: 'Salon Grandeur Nature - Questionnaire de satisfaction', message});
        console.log(mail);
        if(mail && mail.accepted && mail.accepted.length > 0){
            sendSucces.push(present);
            console.log(`Mail to ${present.firstname} ${present.lastname} has been sent`);
            console.log('form - URL  ->  ' + formUrl)

        }
        await utilitiesFunctions.delay(20000);

    }

    const updates = [];
    for(let contact of sendSucces){
        const update = await Contact.findByIdAndUpdate(contact._id, {satisfactionForm: {hasReceived: true, hasAnswered: false}})
        updates.push(update);
        console.log(`${contact.firstname} ${contacts.lastname} updated !`);
    }

    return updates

})()
.then(result => {
    // console.log(result);
    // process.exit(1);
})
.catch(err => console.log(err));

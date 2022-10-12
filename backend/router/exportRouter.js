const express = require('express');
const subscription = require(`${__dirname}/../lib/subscription.js`);
const Contact = require(`${__dirname}/../lib/classes/Contact.js`);
const Exports = require(`${__dirname}/../lib/classes/Exports.js`);
const Response = require(`${__dirname}/../lib/classes/Response.js`);

const exportsRouter = express.Router();

exportsRouter.post('/contacts/salon/all', (req, res) => {
    const contacts = Contact.find().then(result => {
        Exports.contactsToCsv({filename: 'inscrits-salon-gauchy', contacts: result});
        res.send(new Response(200, 'Export for all subscribers is done and available', {url: `http://localhost:4009/files/exports/inscrits-salon-gauchy.csv`}));
    });
})

exportsRouter.post('/contacts/salon/presents', (req, res) => {
    try{
        const contacts = Contact.findFiltered({presence: true}).then(result => {
            Exports.contactsToCsv({filename: 'presents-salon-gauchy', contacts: result});
            res.send(new Response(200, 'success', {url: `http://localhost:4009/files/exports/presents-salon-gauchy.csv`}));
        });
    } catch(err){
        console.log(err);
    }


})

module.exports = exportsRouter;
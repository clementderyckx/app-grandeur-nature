const express = require('express');
const subscription = require(`${__dirname}/../lib/subscription.js`);
const Contact = require(`${__dirname}/../lib/classes/Contact.js`);

const checkRouter = express.Router();

checkRouter.get('/all/presents/', async (req, res) => {
    const contacts = await Contact.findFiltered({presence: true});
    res.send(contacts);
})

checkRouter.get('/:id', async(req, res) => {

    /**
     * Config in the db for start the event
     */
    const result = await subscription.checkIfPresent(req);
    res.send(result);
    
    // res.status(400).send('Bad request');
})



module.exports = checkRouter;
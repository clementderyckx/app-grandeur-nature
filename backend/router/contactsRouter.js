const express = require('express');
const Contact = require(`${__dirname}/../lib/classes/Contact.js`);
const contactModel = require(`${__dirname}/../lib/db/contact.js`);
const subscription = require(`${__dirname}/../lib/subscription`);
const Response = require(`${__dirname}/../lib/classes/Response.js`);

const contactsRouter = express.Router();

// CREATE A CONTACT SUBSCRPTION FOR THE EVENT
contactsRouter.post('/create/', (req, res, next) => {

    subscription.createSubscription(req).then((result) => {
        console.log(result);
        res.send(result);
    }).catch((e) => {
        console.log('an error occurred : ' + e.message)
        return new Response(500, 'An error occured on saving contacts, please try again in few moments.');
    });

});

// GETS ALL CONTACTS THAT HAS SUBSCRIBES TO THE EVENT
contactsRouter.get('/all/', async (req, res, next) => {
    const contacts = await contactModel.find();
    res.send(contacts);
    
    next();
})


// GETS A CONTACT BY HIS ID
contactsRouter.get('/prod/:id', async (req, res, next) => {
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    if(contact && contact._id){
        res.send(new Response(200, 'Here is the contact', contact));
    } else {
        res.send(new Response(400, 'Bad Request', {}))
    }

    next();
})



// GETS A CONTACT BY HIS ID
contactsRouter.get('/single/:id', async (req, res, next) => {
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    if(contact && contact._id){
        res.send(new Response(200, 'Here is the contact', contact));
    } else {
        res.send(new Response(400, 'Bad Request', {}))
    }

    next();
})



// GET ALL CONTACTS THAS HAVE PRESENCE SET TO TRUE
contactsRouter.get('/presents/', async (req, res, next) => {
    const contacts = await Contact.findFiltered({presence: true});
    res.send(contacts);
    next();
})

// GET ALL CONTACTS THAS HAVE RECEIVED THEIR BADGES
contactsRouter.get('/hasbadge/:value', async (req, res, next) => {
    const value = (req.params.value === 'true');
    const contacts = await Contact.findFiltered({hasBadge: value});
    res.send(contacts);

    next();
})




module.exports = contactsRouter;
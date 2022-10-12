const express = require('express');
const utilitiesFunctions = require(`${__dirname}/../lib/utilitiesFunctions.js`);
const fs = require('fs');

const utilitiesRouter = express.Router();

// INSERT ALL CONTACTS IN NOTION USING A CALL
utilitiesRouter.get('/insert-all-in-notion/', async (req, res) => {
    const insert = await utilitiesFunctions.allContactsInNotion();
    res.send("Contact are updating");
});


// ROUTE TO POSSIBLY SEND BADGES FILES
utilitiesRouter.post('/download-badge/', (req, res) => {

    if (!fs.existsSync(`${__dirname}/../files/downloads/`)){
        fs.mkdirSync(`${__dirname}/../files/`)
        fs.mkdirSync(`${__dirname}/../files/downloads/`)
    }

    for(let idattr in req.files) {
        console.log(idattr);
        const file = req.files[idattr];
        const result = fs.createWriteStream(`${__dirname}/../files/downloads/${file.name}`).write(file.data);
        console.log(result);
    }
    
    res.send('upload done !');

});

module.exports = utilitiesRouter;
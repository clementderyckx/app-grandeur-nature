const id = 418;
const db = require(`${__dirname}/../lib/db/db.js`);
const ComparisonModel = require(`${__dirname}/../lib/db/comparison.js`);
const Contact = require(`${__dirname}/../lib/classes/Contact.js`);
const Utils = require(`${__dirname}/../lib/classes/Utils.js`);

(async () => {
    db.connect({ source: 'local'});

    const contacts = await Contact.find();
    const doubles = [];

    for(let i = 417; i < contacts.length; i++) {
        const firstname = Utils.clearString(contacts[i].firstname).toLowerCase();
        const lastname = Utils.clearString(contacts[i].lastname).toLowerCase();
        // // Update Them 
        // await Contact.findByIdAndUpdate(contacts[i]._id, {hasBadge: false, presence: true, badgeCount: 1});

        // COUNT DOUBLE SUBSCRIPTION
        for(let e = 0;  e < 417; e++){
            if(Utils.clearString(contacts[e].firstname).toLowerCase() === firstname && Utils.clearString(contacts[e].lastname).toLowerCase() === lastname ){
                // const model = new ComparisonModel({original: contacts[i], toCompare: contacts[e]})
                // const save = await model.save();
                const updateContact = await Contact.findByIdAndUpdate(contacts[e]._id, {presence: true})
                const deleteDouble = await Contact.deleteById(contacts[i]._id)
                doubles.push(deleteDouble);
            }
        }

    }

    console.log(`There were ${doubles.length} badges not working on that day.`);


})().catch((err) => console.log(err))
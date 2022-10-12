const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    lastname : String,
    firstname : String,
    company : String,
    phone : String,
    email : String,
    postCode: String,
    hasBadge: {type: Boolean, default: false},
    presence: { type: Boolean, default: false },
    hasSatisfactionForm: { type: Boolean, default: false},
    badgeCount: {type: Number, default: 0},
// })
// Uncomment on DB Update
}, { strict: false });


const ContactModel = mongoose.model('contact', contactSchema);

    
module.exports = ContactModel;
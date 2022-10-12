const mongoose = require('mongoose');

const formAnswerSchema = mongoose.Schema({
    formId: String,
    contactId: String,
    answers: Array,
})

const FormAnswerModel = mongoose.model('formAnswer', formAnswerSchema);

    
module.exports = FormAnswerModel;
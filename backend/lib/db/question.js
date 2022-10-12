const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    type: String,
    question: String,
    answers: [],
    obligatory: Boolean,
    formId: {type: String, default: ''},
})


const QuestionModel = mongoose.model('question', questionSchema);

    
module.exports = QuestionModel;
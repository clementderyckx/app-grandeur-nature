const mongoose = require('mongoose');

const satisfactionFormSchema = mongoose.Schema({
    name: String,
    questions: Array,
    answers: {type: Number, default: 0},
})

const SatisfactionFormModel = mongoose.model('satisfactionForm', satisfactionFormSchema);

    
module.exports = SatisfactionFormModel;
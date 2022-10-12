const mongoose = require('mongoose');

const comparisonSchema = mongoose.Schema({
    original: Object,
    toCompare: Object
})

const ComparisonModel = mongoose.model('comparison', comparisonSchema);

    
module.exports = ComparisonModel;
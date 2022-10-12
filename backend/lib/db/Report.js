const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    status: Number,
    reportSessionName : String,
    reportSessionId: {type: String, default: ''},
    comment: {type: String, default: ''},
    reportArray : Array,
    date : { type: Date, default: Date.now() },
})



const ReportModel = mongoose.model('report', reportSchema);

module.exports = ReportModel;
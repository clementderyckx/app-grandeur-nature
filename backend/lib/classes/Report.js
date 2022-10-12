const ReportModel = require(`${__dirname}/../db/Report.js`);

class Report {

    constructor({ status, message, results }) {
        this.ReportModel = ReportModel;
        this.status = status;
        this.message = message;
        this.results = results;
    }

    /**
     * Generates a report and save it to the DB
     * @param status {Number}
     * @param message {String}
     * @param results {Array}
     * @returns {Promise<*>}
     */
    static async generatesReport(status, message, results){
        const report = new ReportModel({ status: status, reportSessionName: message, reportArray: results });
        report.reportSessionId = report._id
        try{
            const saveReport = await report.save();
        } catch (e) {
            console.log(`an error occured on sending reports : ${e.message}`);
        }
        return report
    }

}

module.exports = Report;
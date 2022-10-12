const fs = require('fs');

class Logs {

    constructor() {
        this.logDir = `${__dirname}/../../logs`;
        this.logFile = `${this.logDir}/logs.log`;
        this.errorLogFile = `${this.logDir}/errLogs.log`;
        this.successLogFile = `${this.logDir}/success.log`;
    }

    getLogsDir(){
        return this.logDir;
    }

    static errorWritingLog(errorMessage){
        fs.appendFile(this.logFile, `LOG: An error occured writing an error log file : \n ${errorMessage}`, (e) => console.log(e.message));
    }

    writeErrorLog(errorNode, errorMessage){
        fs.appendFile(`${this.logFile}`, `${errorNode}\r\n`, (e) => {
            if(e) {
                this.errorWritingLog(e.message);
            }
        });

        fs.appendFile(this.logFile, `${errorMessage}\r\n`, (e) => {
            (e) ? this.errorWritingLog(e.message) : console.log(`New error log written in ${this.service}.log`);
        })

    }

    writeSuccessLog(successMessage){
        fs.appendFile(this.successLogFile, `${this.service}: ${successMessage}. \n`, (e) => (e) ? console.log(e.message) : null);
    }

}


module.exports = Logs;
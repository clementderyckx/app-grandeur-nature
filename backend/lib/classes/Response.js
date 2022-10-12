class Response {

    /**
     * 
     * @param status {Number}
     * @param message {String}
     * @param result {*}
     */
    constructor(status, message, result) {
        this.status = status;
        this.message = message;
        this.result = result;
    }

}

module.exports = Response;
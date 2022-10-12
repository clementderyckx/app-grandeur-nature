class Utilities {

    /**
     * Generates a formatted error
     * @param input
     * @param message
     * @returns {{input, message}}
     */
    static error(input, message){
        return {
            input: input.name,
            message: message
        }
    }

    /**
     * Generates a formatted response
     * @param status
     * @param message
     * @returns {{message, status}}
     */
    static response(status, message) {
        return {
            status: status,
            message: message,
        }
    }

}

// Comment on node
export default Utilities
/* Uncomment on node
module.exports = Utilities
 */
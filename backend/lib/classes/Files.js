const fs = require('fs');
const Response = require(`${__dirname}/Response.js`);
class Files {

    /**
     * Removes the specified file 
     * @param {String} path 
     * @returns {Response}
     */
    static remove(path) {
        let response = "";
        fs.unlink(path, (err) => {
            if(err){
                response = new Response(400, `error removing file -> ${path}`, err)
            }
        })
        if(!response.status){
            response = new Response(200, `File ${path} has been correctly removed`, err)
        }
        return response;
    }

}

module.exports = Files;
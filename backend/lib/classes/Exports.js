const fs = require('fs');
const filesDir = `${__dirname}/../../files`;
const exportsDir = `${__dirname}/../../files/exports`;

class Exports {

    static createFolders() {
        if(!fs.existsSync(exportsDir)){
            if(!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);
            fs.mkdirSync(exportsDir);
        }
    }


    static contactsToCsv({filename, contacts, encoding}){
        const encoded = (encoding) ? encoding : 'utf8';
        const filepath = `${exportsDir}/${filename}.csv`;
        Exports.createFolders();
        if(fs.existsSync(filepath)){
            fs.unlinkSync(filepath);
        } 
    
        const header= ['Nom', 'Prénom', 'Entreprise', 'Tel', 'Adress-Mail', '\n'];
        const newFile = fs.writeFileSync(filepath, header.join(';'), encoded);
        const content = [];
        for (let contact of contacts) {
            const values = [contact.lastname, contact.firstname, contact.company, contact.phone, contact.email, '\n'];
            fs.appendFileSync(filepath, values.join(';'), encoded);
            content.push(values);
        }
    }
}

module.exports = Exports;
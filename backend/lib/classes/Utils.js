const Notion = require('./Notion.js');
const Contact = require('./Contact.js');

class Utils{
    static clearString (string){
        let str = (string.includes('é')) ? string.replaceAll('é', 'e') : string;
        if(str.includes('è')) str = str.replaceAll('è', 'e');
        if(str.includes('é')) str = str.replaceAll('é', 'e');
        if(str.includes('ë')) str = str.replaceAll('ë', 'e');
        if(str.includes('ê')) str = str.replaceAll('ê', 'e');
        if(str.includes('â')) str = str.replaceAll('â', 'a');
        if(str.includes('ä')) str = str.replaceAll('ä', 'a');
        if(str.includes('ö')) str = str.replaceAll('ö', 'o');
        if(str.includes('ô')) str = str.replaceAll('ô', 'o');
        if(str.includes(')')) str = str.replaceAll(')', '');
        if(str.includes('(')) str = str.replaceAll('(', '');
        if(str.includes(' ')) str = str.replaceAll(' ', '-');
        if(str.includes('/')) str = str.replaceAll('/', '');
        if(str.includes('.')) str = str.replaceAll('.', '');
        if(str.includes('"')) str = str.replaceAll('"', '');
        if(str.includes("'")) str = str.replaceAll("'", '');
        if(str.startsWith('-')) str = str.replace('-', '');
    
        return str;
    }

    static clearMail(mail){

        const modifiedMail = mail.toLowerCase();
        return modifiedMail
    }

    static async insertAllContactsInNotion() {
        const notion = new Notion();
        const contacts = await Contact.find();
        for (let contact of contacts){
            const newContact = new Contact(contact);
            console.log(newContact);
            const insertToNotion = await newContact.insertToNotion();
        }
    }

    /**
     * Checks if a string has all its caract in upperCase. returns Boolean.
     * @param {*} string 
     * @returns {Boolean}
     */
    static isUpperCase(string){
        const stringArr = string.split('');
        let upperCaracters = 0;
        stringArr.forEach(c => {
            const caract = c;
            if(c.toUpperCase() === caract){
                upperCaracters++;
            };
        })
    
        return (stringArr.length === upperCaracters);
    }


    /**
     * Returns an array containing respectuously [date, time]
     * @returns {Array} [date, time]
     */
    static getFrDate(){
       const dateObj = new Date();
       return dateObj.toLocaleString().split(', ');
   }
}

module.exports= Utils;
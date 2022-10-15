if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: `${__dirname}/../../.env`});
}
const NotionAPI = require('@notionhq/client');

class Notion {

    constructor(){
        this.notion = new NotionAPI.Client({ auth: process.env.NOTIONKEY });
    }

    /**
     * Insert the contact to the notion array
     * @param {Contact} contact 
     */
    async insertContact(contact){

        console.log(contact)
        const response = await this.notion.pages.create({

            "parent": {
                "type": "database_id",
                "database_id": process.env.NOTIONDB
            },
            "properties": {
                "Nom": { "title": [{ "text": {"content": contact.lastname} }] },
                "Prénom": { "rich_text": [{ "text": { "content": contact.firstname } }] },
                "Société": { "rich_text": [{ "text": { "content": contact.company } }] },
                "Code Postal": {"rich_text": [{ "text": { "content": contact.postCode } }] },
                "Tel": { "phone_number": contact.phone },
                "Mail": { "email": contact.email },
            },
        });
        console.log(response.body);
    }
}
module.exports = Notion;
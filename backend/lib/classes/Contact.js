const ContactModel = require(`${__dirname}/../db/contact`);
const Utils = require(`${__dirname}/Utils`);
const Notion = require(`${__dirname}/Notion.js`);

class Contact {
    constructor(contact, options) {
        this.lastname = contact.lastname;
        this.firstname = contact.firstname;
        this.company = contact.company;
        this.phone = (contact.phone) ? Utils.clearString(contact.phone) : "";
        this.email = contact.email;
        this.postCode = (contact.postCode) ? contact.postCode : '';
        this.filename = `${this.company}-${this.firstname}-${this.lastname}.svg`;
    }

    getNewModel(whatIs){
        const model = (whatIs) ? new ContactModel(whatIs) : new ContactModel();
        return  model;
    }

    async save(){

        const isPresent = await this.checkIfPresent();
        if(isPresent === false) {
            const contact = new ContactModel(this);
            console.log('contact model :');
            console.log(contact);
            const result = await contact.save();
            return result;
        } else {
            return {
                message: 'contact is already present in the database'
            }
        }
    }

    async checkIfPresent(){
        let i = 0;
        const contacts = await Contact.find();
        contacts.forEach((contact) => {
            if (contact.lastname === this.lastname && contact.firstname === this.firstname && contact.company === this.company) i++;
        });

        return (i > 0);
    }

    /**
     * 
     * @param {*} contact 
     * @param {*} param1 
     * @returns 
     */
    static async checkIfHasBadge(contact, { hasBadgesArr }){
        let count = 0;
        const hasBadgeContacts = (hasBadgesArr) ? hasBadgesArr : await hasBadgeModel.find();

        for(let i = 0; i < hasBadgeContacts.length; i++){
            if (hasBadgeContacts[i].id === contact._id) count++;
        };
        return (count > 0);
    }


    static async saveStatic(contact){
        const newContact = new ContactModel(contact);
        const result = await newContact.save();
        return result;
    }

    static async getNoBadges(bool){
        const contacts = await ContactModel.find({hasBadge: false});
        return contacts;
    }

    /**
     * Find contact by filter
     * @param {Object} filter 
     * @returns {Array}
     */
    static async findFiltered(filter){
        const contacts = await ContactModel.find(filter);
        return contacts;
    }

    static async find(){
        const contacts = await ContactModel.find();
        return contacts;
    }

    static async findById(id){
        const contacts = await ContactModel.findById(id);
        return contacts;
    }

    static async deleteById(id){
        const contacts = await ContactModel.findByIdAndDelete(id);
        return contacts;
    }
    static async findByIdAndUpdate(id, newObject){
        const contacts = await ContactModel.findByIdAndUpdate(id, newObject, { new: true });
        return contacts;
    }

    
    async insertToNotion(){
        const notion = new Notion();
        const res = await notion.insertContact(this);
        return res;
    }


}
module.exports = Contact;